import { adsSelector } from '../../../redux/reducers/adsSlice'
import { useAppSelector } from '../../../hooks/hooks'
import { ads } from '../ads.interface';
import { useEffect, useState } from 'react';
import { AdsLinkField } from './AdsLinkField';

export const AdsList = () => {
    const ads = useAppSelector(adsSelector)  
    
    const [links, setLinks] = useState<ads[]>()      
    //se utiliza para que funcione el map con el delete correctamente
    useEffect(() => {
      setLinks(ads.adsList)
    }, [ads])
    
    return (
        
    <>   
    {ads.loading &&  <div>Cargando...</div>}
    {links != undefined &&        
        links?.map((element: ads)=>{        
            return (                                  
                element.posicion_id  == 1 ?(
                    <div key={`${element.id}-div1`} className="row mb-3 border">    
                        <div className="col">
                            <img  className='img-thumbnail' src={element.download_url}/>           
                        </div>            
                        <div className="col">                        
                            <h3>{element.titulo}</h3>
                            <h5>{element.subtitulo}</h5>
                            <p className='lead'>{element.descripcion}</p>                            
                            <button className="btn btn-primary btn-sm mb-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${element.id}`} aria-expanded="false" aria-controls={`collapse-${element.id}`}>
                                Enlaces de interés
                            </button>
                            <div className="collapse" id={`collapse-${element.id}`}>
                                <div className="card card-body">                            
                                    <AdsLinkField
                                    key={`${element.id}-service-linkfield1`}
                                    link={element.links}                        
                                    />                            
                                </div>
                            </div>
                        </div>
                    </div>                 
                )
                    
                    :
        
                (    
                    <div key={`${element.id}-div2`} className="row mb-3 border">
                        <div className="col">                        
                            <h3>{element.titulo}</h3>
                            <h5>{element.subtitulo}</h5>
                            <p className='lead'>{element.descripcion}</p>

                            <button className="
                            
                            btn btn-primary btn-sm mb-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${element.id}`} aria-expanded="false" aria-controls={`collapse-${element.id}`}>
                                    Enlaces de interés
                            </button>
                            <div className="collapse mb-2" id={`collapse-${element.id}`}>
                                <div className="card card-body">                                 
                                    <AdsLinkField
                                    key={`${element.id}-service-linkfield1`}
                                    link={element.links}                        
                                    />                                
                                </div>
                            </div>
                        </div>
                        <div className="col">        
                            <img  className='img-thumbnail' src={element.download_url}/>
                        </div>
                    </div> 
                )                                           
            )     
        })
    } 
    </>
    )
}
