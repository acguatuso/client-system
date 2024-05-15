import {useAppSelector } from '../../../hooks/hooks'
import { ServiceSelector } from '../../../redux/reducers/servicesSlice'

export const ServiceMain = () => {
    const service = useAppSelector(ServiceSelector)  
  return (
    <>
  <div className="text-center rounded">  
      <img src={service.main.download_url} className="img-fluid" />      
      <h1 className="display-1 text-black">{service.main.titulo}</h1>
      <h3 className="display-6 text-black">{service.main.subtitulo}</h3> 
      <hr className='border border-secondary border opacity-10 m-5'/>        
    </div> 
    </>
  )
}
