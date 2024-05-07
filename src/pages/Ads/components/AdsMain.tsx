import { adsSelector } from '../../../redux/reducers/adsSlice'
import { useAppSelector } from '../../../hooks/hooks'

export const AdsMain = () => {
    const ads = useAppSelector(adsSelector) 
    
  return (
    <>
  <div className="text-center rounded mb-5">  
      <img src={ads.main.download_url} className="img-fluid" />      
      <h1 className="display-1 text-black">{ads.main.titulo}</h1>
      <h3 className="display-6 text-black">{ads.main.subtitulo}</h3>
  </div>   
    </>
  )
}
