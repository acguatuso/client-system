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
      <Route path="/" element={<LoginAccountForm />} />
      <Route path="/iniciar-sesion" element={<LoginAccountForm />} />
      <Route path="/home" element={<HomePageApp />} />
      <Route path="/crear-cuenta" element={<CreateAccountForm />} />
      <Route path='/Cursos' element={<CursosMain />} />
      <Route path='/About' element={<About />} />
      <Route path='/mi-perfil' element={<MiPerfil />} />
      {/* <Route path='/mis-cursos' element={<MisCursos />} /> */}
      <Route path='/avisos' element={<Ads/>}></Route>
      <Route path='/servicios' element={<ServicePage />}></Route>
      <Route path="/curso/:nombre" element={<DetallesCurso/>} />
    </Routes>
  )
}
