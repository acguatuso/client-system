import {useAppSelector } from '../../../hooks/hooks'
import { ServiceSelector } from '../../../redux/reducers/servicesSlice'

export const ServiceMain = () => {
    const service = useAppSelector(ServiceSelector)  
  return (
    <>
  <div className="text-center rounded mb-5">  
      <img src={service.main.download_url} className="img-fluid" />      
      <h1 className="display-1 text-black">{service.main.titulo}</h1>
      <h3 className="display-6 text-black">{service.main.subtitulo}</h3>
      <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
        Actualizar Inicio
      </button>  
    </div> 
    </>
  )
}
