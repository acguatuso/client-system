import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { data_base } from '../../firebase';
import { useState }  from 'react';
import { Timestamp } from "firebase/firestore"; 
import './MatriculaEstudiantePage.css';
import NotificationModal from '../../components/Modal/NotificationModal';
import { NavLink } from 'react-router-dom';

interface Props {
    identificadorCurso: string;
  }
  
export const MatriculaEstudiantePage: React.FC<Props> = ({ identificadorCurso }) => {
    
    const [mostrarMensajePostulado, setMostrarMensajePostulado] = useState(false);
    const [mostrarMensajePostulacionExistente, setMostrarMensajePostulacionExistente] = useState(false);

    const user = useSelector((state: RootState) => state.auth.user);
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const [idUser, setIdUser] = useState(''); 
    
    useEffect(() => {
        if (loggedIn && user){
            cargarDatos();
        }
    }, [loggedIn, user]);
    
    const fetchData = async (correo: string) => {
        // Primero tomamos la referencia de donde se encuentran todos los usuarios de Firebase
        const usuariosRef = collection(data_base, "Usuarios");
        // Luego, Query consulta para buscar documentos con el correo electrónico proporcionado
        const db_query = query(usuariosRef, where("correo", "==", correo));
        // Luego, Obtener el documento del usuario
        const usuarioDocSnap = await getDocs(db_query);
        // Obtener el primer documento en el QuerySnapshot
        const primerDocumento = usuarioDocSnap.docs[0];
        const idUsuario = primerDocumento.id;
        setIdUser(idUsuario);
    }

    //Necesario para wvitar problemas de asincronizacion cuando se matriculan los cursos. 
    //Con esto siendo llamado desde el useEffect, en teoria carga los datos del correo del usuario para que ya esten listos por si se matriculan cursos
    const cargarDatos = async () => {
        const correoUsuario = user?.correo || '';
        await fetchData(correoUsuario);
    }

    const registrarTiempoMatricula = (): Timestamp => {
        const fecha = new Date();
        const marcaDeTiempoFirebase = Timestamp.fromDate(fecha);

        return marcaDeTiempoFirebase;
    }

    const matricular = async () => {
        cargarDatos();
        const idCurso = identificadorCurso;
        const horaSol = registrarTiempoMatricula();

        try{
            const cursoRef = doc(data_base, 'Cursos', idCurso);
            // Obtener el documento actual del curso
            const cursoSnap = await getDoc(cursoRef);
            const cursoData = cursoSnap.data();
            //const nombreCurso: string = (cursoData) ? cursoData.nombre : ''; 
            // Verificar si el array postulados existe en el documento del curso
            const postuladosArray = cursoData?.postulados || [];
            // Verificar si el usuario ya está en la lista de postulados
            const usuarioExistente = postuladosArray.some((postulado: { id: string }) => postulado.id === idUser);

            if (!usuarioExistente) {
                // Agregar el nuevo postulado al array
                postuladosArray.push({
                    hora_solicitud: horaSol,
                    id: idUser
                });

                // Actualizar el array "postulados" en el documento del curso
                await updateDoc(cursoRef, {
                    postulados: postuladosArray
                });
                setMostrarMensajePostulado(true); // Mostrar el modal de confirmación directamente
            } else {
                setMostrarMensajePostulacionExistente(true);
            }
        }catch (error){
            console.error("Error al matricular: ", error);
        }
    }

    // Función para guardar los cambios después de confirmar en el modal
    const handleConfirmSave = () => {
        setMostrarMensajePostulacionExistente(false);
        setMostrarMensajePostulado(false); // Cierra el modal después de guardar
    };


    return (
        <>
        {loggedIn && (
            <div>
                {/*  <!-- Button para activar el modal --> */}
                <button type="button" className="btn btn-matricula btn-sm" data-bs-toggle="modal" data-bs-target="#ModalMatricula">
                    Matricular
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="ModalMatricula" tabIndex={-1} aria-labelledby="matriculaModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* Header del modal */}
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="matriculaModalLabel">Matricular Curso</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {/* Body del modal */}
                            <div className="modal-body">
                                ¿Seguro/a de matricular el curso?
                            </div>
                            {/* Footer del modal */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-success" onClick={matricular} data-bs-dismiss="modal">Matricular</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal para informar que te postulaste en el curso*/}
                <NotificationModal
                    texto="La solicitud de matrícula ha sido enviada."
                    mostrar={mostrarMensajePostulado}
                    onConfirm={handleConfirmSave}
                />
                {/* Modal para informar que ya te encuentras postulado en el curso*/}
                <NotificationModal
                    texto="Ya te encuentras en la lista de postulados."
                    mostrar={mostrarMensajePostulacionExistente}
                    onConfirm={handleConfirmSave}
                />
            </div>)}
        {!loggedIn && (
            <NavLink
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} inicia-sesion`}
                to="/client-system/iniciar-sesion"
                >
                <h4>Inicia Sesión y Matricula Ya!!!</h4>
            </NavLink>
        )}
        </>
    )
}