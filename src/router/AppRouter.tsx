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
import Mycourses from '../pages/Mycourses/Mycourses';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageApp/>} />
      <Route path="/home" element={<HomePageApp/>} />
      <Route path="/iniciar-sesion" element={<LoginAccountForm />} />
      <Route path="/crear-cuenta" element={<CreateAccountForm />} />
      <Route path='/cursos' element={<CursosMain />} />
      <Route path='/about' element={<About />} />
      <Route path='/mi-perfil' element={<MiPerfil />} />
      <Route path='/mis-cursos' element={<Mycourses />} />
      <Route path='/avisos' element={<Ads/>}></Route>
      <Route path='/servicios' element={<ServicePage />}></Route>
      <Route path="/cursos/:nombre" element={<DetallesCurso/>} />
    </Routes>
  )
}
