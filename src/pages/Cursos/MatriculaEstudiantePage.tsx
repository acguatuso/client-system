import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { getFirebaseDocs } from '../../api/getFirebaseDocs/getFirebaseDocs';


export const MatriculaEstudiantePage = () => {


    //TODO: Hacer Reducer para traer el id del usuario, para no hacer esto aqui
    const fetchData = async () => {

        const usuariosBaseDatos = await getFirebaseDocs('Usuarios');
        console.log({usuariosBaseDatos})
    }


    //TODO
    // Quiero ver la información de la persona que inició sesión
    // Quiero tener la información del curso seleccionado.... (Esperar implementación Mariana)

    const user = useSelector((state: RootState) => state.auth.user);
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn && !user) {
            navigate("/");
        }    
    }, [loggedIn, user, navigate]);


    const matricular = () => {
        //TODO
        // Si usuario no está postulado en curso, entonces puede mandar la solicitud
        // Si usuario se encuentra postulado, entonces evitar duplicidad
        //console.log({user})
        fetchData()
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
