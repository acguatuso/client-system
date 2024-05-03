import { UpdateMainSectionModal } from "./components/UpdateMainSectionModal";
import { AdsSection } from './components/AdsSection';
import { fetchMainSection, fetchSections } from '../../redux/reducers/aboutSlice';
import { useAppDispatch } from "../../hooks/hooks";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export const About = () => {
  //IMPLEMENTACION DE REDUX
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      await dispatch(fetchMainSection())
      await dispatch(fetchSections())
    })()
  }, [])
  
  // LOGICA PARA REDIRECCIONAR SI NO SE ESTA LOGUEADO, PARA QUE NO SE PUEDA ACCEDER MENDIATE URL DIRECTA
  // React-router-dom
  const navigate = useNavigate();
  //Redux Hooks & Access
  const user = useSelector((state: RootState) => state.auth.user);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  //Redireccionar si está no logueado, y no hay usuario
  useEffect(() => {
    if (!loggedIn && !user) {
      navigate("/");
    }
  }, [loggedIn, user, navigate]);

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