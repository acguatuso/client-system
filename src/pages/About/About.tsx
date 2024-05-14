import { UpdateMainSectionModal } from "./components/UpdateMainSectionModal";
import { AdsSection } from './components/AdsSection';
import { fetchMainSection, fetchSections } from '../../redux/reducers/aboutSlice';
import { useAppDispatch } from "../../hooks/hooks";
import { useEffect } from "react";

export const About = () => {
  //IMPLEMENTACION DE REDUX
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      await dispatch(fetchMainSection())
      await dispatch(fetchSections())
    })()
  }, [])
  
  return (
    <>
        <UpdateMainSectionModal/>
        <div className="container-fluid">
          <AdsSection />
        </div>
    </>
  )
}
export default About;