import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { getFirebaseDocs } from '../../api/getFirebaseDocs/getFirebaseDocs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { data_base } from '../../firebase';
import { useState }  from 'react';


export const MatriculaEstudiantePage = () => {
    //TODO
    // Quiero tener la información del curso seleccionado.... (Esperar implementación Mariana)
    
    const user = useSelector((state: RootState) => state.auth.user);
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const navigate = useNavigate();
    const [idUser, setIdUser] = useState('');
    
    useEffect(() => {
        if (!loggedIn && !user) {
            navigate("/");
        }
    }, [loggedIn, user, navigate]);
    
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

    const matricular = () => {
        //TODO
        // Si usuario no está postulado en curso, entonces puede mandar la solicitud
        // Si usuario se encuentra postulado, entonces evitar duplicidad
        const correoUsuario = user?.correo || '';
        fetchData(correoUsuario);
        console.log({idUser})
    }


    return (
        <>
        {loggedIn && (
            <div>

                <h1>MatriculaEstudiantePage</h1>

                {/*  <!-- Button para activar el modal --> */}
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalMatricula">
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
                                <button type="button" className="btn btn-primary" onClick={matricular} data-bs-dismiss="modal">Matricular</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}
