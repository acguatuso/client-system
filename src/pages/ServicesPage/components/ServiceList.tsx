import { useAppSelector } from '../../../hooks/hooks'
import { useEffect, useState } from 'react';
import { ServiceSelector } from '../../../redux/reducers/servicesSlice';
import { service } from '../service.interface';
import { ServiceLinkField } from './ServiceLinkField';

export const ServiceList = () => {
    const service = useAppSelector(ServiceSelector)  
    
    const [services, setServices] = useState<service[]>()      
    //se utiliza para que funcione el map con el delete correctamente
    useEffect(() => {
      setServices(service.ServiceList)
    }, [service])
    
    return (
        
    <>   
    {service.loading &&  <div>Cargando...</div>}
    {services != undefined &&        
        services?.map((element: service)=>{        
            return ( 
                                 
                element.posicion_id  == 1 ?(
                    <div key={`${element.id}-div1`} className="row text-start">    
                        <div className="col">
                            <img  className='img-fluid' src={element.download_url}/>           
                        </div>            
                        <div className="col">                        
                            <h3>{element.titulo}</h3>
                            <p className='lead'><strong>{element.subtitulo}</strong></p>
                            <p className='lead'>{element.descripcion}</p>                            
                            <button className="btn btn-primary btn-sm mb-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${element.id}`} aria-expanded="false" aria-controls={`collapse-${element.id}`}>
                                Enlaces de interés
                            </button>
                            <div className="collapse" id={`collapse-${element.id}`}>
                                <div className="card card-body">
                                <ServiceLinkField
                                key={`${element.id}-service-linkfield1`}
                                link={element.links}                        
                                />
                                </div>
                            </div>
                        </div>
                        <hr className='border border-secondary border opacity-10 m-5'/>        

                    </div>                 
                )
                    
                    :
        
                (    
                    <div key={`${element.id}-div2`} className="row text-end">
                        <div className="col">                        
                            <h3>{element.titulo}</h3>
                            <p className='lead'><strong>{element.subtitulo}</strong></p>
                            <p className='lead'>{element.descripcion}</p>

                            <button className="btn btn-primary btn-sm mb-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${element.id}`} aria-expanded="false" aria-controls={`collapse-${element.id}`}>
                                    Enlaces de interés
                            </button>
                            <div className="collapse mb-2" id={`collapse-${element.id}`}>
                                <div className="card card-body">
                                <ServiceLinkField
                                key={`${element.id}-service-linkfield2`}
                                link={element.links}                        
                                />
                                </div>
                            </div>
                        </div>
                        <div className="col">        
                            <img  className='img-fluid' src={element.download_url}/>
                        </div>  
                        <hr className='border border-secondary border opacity-10 m-5'/>                      
                    </div> 
                )                                           
            )     
        })
    } 
    </>
    )
}
