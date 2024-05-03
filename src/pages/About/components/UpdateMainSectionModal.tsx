import { useAppSelector } from '../../../hooks/hooks';
import { aboutSelector } from '../../../redux/reducers/aboutSlice';


export const UpdateMainSectionModal = () => {
  const about = useAppSelector(aboutSelector)
       
  return (
  <>
    <div className="text-center rounded mb-5">  
      <img src={about.head.download_url_principal} className="img-fluid" />      
      <h1 className="display-1 text-black">{about.head.titulo_principal}</h1>
      <h3 className="display-6 text-black">{about.head.subtitulo_principal}</h3>
    </div>
  </>
  )
}

