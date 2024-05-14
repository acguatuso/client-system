import { adsSection } from '../about.interface';
import { useAppSelector } from '../../../hooks/hooks';
import { aboutSelector } from '../../../redux/reducers/aboutSlice';
import { useEffect, useState } from 'react';

export const AdsSection = () => {    
    const about = useAppSelector(aboutSelector)    
    const [sections, setSections] = useState<adsSection[]>([])

    useEffect(() => { 
        setSections(about.sections)
    }, [about])

    
    return (
        
    <>   
    {about.loading &&  <div>Cargando...</div>}
    {        
        sections.map((element: adsSection)=>{                    
            return (                                  
                    element.posicion_id  == 1 ?(
                        <div key={`${element.id}-div1`} className="row mb-1 text-start">    
                            <div className="col">
                                <img  className='img-fluid' src={element.download_url}/>           
                            </div>                                       
                            <div className="col">                        
                                <h3>{element.titulo}</h3>
                                <p className='lead'><strong>{element.subtitulo}</strong></p>
                                <p className='lead'>{element.descripcion}</p>
                            </div> 
                            <hr className='border border-secondary border opacity-10 m-5'/>        
                        </div>     
                                 
                    )
                        
                        :
            
                    (    
                        <div key={`${element.id}-div2`} className="row mb-1 text-end">
                            <div className="col">                        
                                <h3>{element.titulo}</h3>
                                <p className='lead'><strong>{element.subtitulo}</strong></p>
                                <p className='lead'>{element.descripcion}</p>
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
