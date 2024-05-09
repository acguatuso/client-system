import { Route, Routes } from 'react-router-dom';
import LoginAccountForm from '../components/gestion_usuarios/LoginAccForm';
import CreateAccountForm from '../components/gestion_usuarios/CreateAccForm';
import CursosMain from '../components/gestion_cursos/CursosMain';
import About from '../pages/About/About';
import { HomePageApp } from '../pages/HomePage';
import MiPerfil from '../components/gestion_usuarios/MiPerfil';
import { Ads } from '../pages/Ads/Ads';
import { ServicePage } from '../pages/ServicesPage/ServicePage';
import DetallesCurso from '../components/gestion_cursos/DetallesCurso';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageApp/>} />
      <Route path="/client-system/" element={<HomePageApp/>} />
      <Route path="/client-system/home" element={<HomePageApp/>} />
      <Route path="/client-system/iniciar-sesion" element={<LoginAccountForm />} />
      <Route path="/client-system/crear-cuenta" element={<CreateAccountForm />} />
      <Route path='/client-system/cursos' element={<CursosMain />} />
      <Route path='/client-system/about' element={<About />} />
      <Route path='/client-system/mi-perfil' element={<MiPerfil />} />
      {/* <Route path='/client-system/mis-cursos' element={<MisCursos />} /> */}
      <Route path='/client-system/avisos' element={<Ads/>}></Route>
      <Route path='/client-system/servicios' element={<ServicePage />}></Route>
      <Route path="/client-system/cursos/:nombre" element={<DetallesCurso/>} />
    </Routes>
  )
}