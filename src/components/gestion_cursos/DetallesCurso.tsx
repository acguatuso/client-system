import { useLocation, useNavigate } from 'react-router-dom';
import { Curso } from './curso.interface';
import { obtenerNombreModalidad } from '../../redux/reducers/cursosSlice';
import { FaArrowLeft } from 'react-icons/fa';
import { MatriculaEstudiantePage } from '../../pages';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


interface DetallesCursoState {
  curso: Curso;
}

function DetallesCurso() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  // Extraer el estado pasado desde el enlace
  const { state } = location;
  const { curso } = state as DetallesCursoState;
  const goBack = () => {
    navigate("/Cursos");
  };

 
  return (
    <>
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-primary me-2" onClick={goBack}>
          <FaArrowLeft /> Volver
        </button>
      </div>
      <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0">{curso.nombre}</h2>
      </div>
      <div className="row text-start">
        <div className="col-md-6">
          <img src={curso.download_url} style={{ width: "100%", height: "400px"}} alt="Imagen del curso" className="img-fluid mb-4" />
        </div>
        <div className="col-md-6">
          <p className="mb-3"><strong>Descripción:</strong> {curso.descripcion}</p>
          <p><strong>Modalidad:</strong> {obtenerNombreModalidad(curso.modalidad)}</p>
          <p><strong>Fecha de Inicio:</strong> {curso.fecha_inicio && new Date(curso.fecha_inicio.seconds * 1000).toLocaleDateString()}</p>
          <p><strong>Fecha de Fin:</strong> {curso.fecha_finalizacion && new Date(curso.fecha_finalizacion.seconds * 1000).toLocaleDateString()}</p>
          
          {loggedIn && user && (
            <div>
              {curso.link_plataforma && (
                <p>
                  <strong>Link del Curso:</strong>{" "}
                  <a href={curso.link_plataforma} target="_blank" rel="noopener noreferrer">
                    {curso.link_plataforma}
                  </a>
                </p>
              )}
            </div>
          )}

          <p><strong>Horario:</strong></p>
          <ul>
            {curso.horario.map((horario, index) => (
              <li key={index}>
                {horario.dia}: {horario.hora}
              </li>
            ))}
          </ul>
          <MatriculaEstudiantePage identificadorCurso={curso.id || ''}/>
        </div>
      </div>
    </div>
    </>
  );
}

export default DetallesCurso;
