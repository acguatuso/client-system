import { FaEye } from 'react-icons/fa'
import { Timestamp } from 'firebase/firestore'
import { userCoursesList } from './MycoursesTable'

export const CourseDetails = (props: userCoursesList) => {
  return (
    <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#ver-${props.id}`}>
          <FaEye />
        </button>
        <div className="modal fade" id={`ver-${props.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">{`Información del Curso: ${props.nombre}`}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-start">
              <div className="row">
                <div className="col" style={{ width: "50%", height: "auto" }}>
                  <img
                    src={props.download_url}
                    alt="Imagen"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="col">
                  <p><strong>Nombre:</strong> {props.nombre}</p>
                  <p><strong>Descripción:</strong> {props.descripcion}</p>
                  <p><strong>Modalidad:</strong> {props.modalidad==0 ? "Presencial" : props.modalidad==1 ? "Virtual" : "Mixta"}</p>
                  <p><strong>Fecha de Inicio:</strong> {props.fecha_inicio instanceof Timestamp ? props.fecha_inicio.toDate().toLocaleDateString() : ''}</p>
                  <p><strong>Fecha de Fin:</strong> {props.fecha_finalizacion instanceof Timestamp ? props.fecha_finalizacion.toDate().toLocaleDateString() : ''}</p>
              {props.link_plataforma && (
                <p>
                  <strong>Link del Curso:</strong>{" "}
                  <a href={props.link_plataforma} target="_blank" rel="noopener noreferrer">
                    {props.link_plataforma}
                  </a>
                </p>
              )}
              <p><strong>Horario:</strong></p>
              <ul>
                {props.horario.map((horario, index) => (
                  <li key={index}>
                   {horario.dia}: {horario.hora}
                  </li>
                ))}
              </ul>
                </div>
                
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}
