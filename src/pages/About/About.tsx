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
      <div className="p-3 mb-2 bg-white text-dark border" id="about-container">
        <UpdateMainSectionModal/>
        <div className="container-fluid">
          <AdsSection />
        </div>
      </div>
    </>
  )
}
export default About;