import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logOut } from '../../redux/reducers/authSlice';
import './Navbar.css';

export const Navbar = () => {

    // Redux Hooks & Access
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const empresaData = useSelector((state: RootState) => state.empresa.dataEmpresa);

    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/iniciar-sesion', { replace: true })
    }

    return (

        <div className="navbar-container shadow-lg">
            <nav className="navbar navbar-expand-sm fixed-top text-dark bg-light p-2">
                <div className="container-fluid">
                    {user && loggedIn && (
                        <NavLink
                            className="navbar-brand"
                            to="/home"
                        >
                            <img src="/src/assets/LogoUCAG.png" alt="Logo" width="110" height="80" />

                        </NavLink>)}
                    {!user && !loggedIn && (
                        <NavLink
                            className="navbar-brand"
                            to="/"
                        >
                            <img src="/src/assets/LogoUCAG.png" alt="Bootstrap" width="110" height="80" />

                        </NavLink>)}
                        <h4 className="navbar-title-text d-none d-sm-inline-block">
                            {empresaData?.titulo_footer ?? 'Unión Cantonal de Asociaciones Guatuso'}
                        </h4>
                    {/* <h4 className='navbar-text-white'>{ empresaData?.nombre ?? 'Unión Cantonal de Asociaciones Guatuso'}</h4> */}
                    <button className="navbar-toggler navbar-white navbar-toggler-custom" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbar-collapse-custom" id="navbarTogglerDemo01">

                        <div className="navbar-collapse ">
                            {user && loggedIn && (
                                ""
                            )}
                        </div>
                        {/* <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex flex-column flex-lg-row justify-content-lg-end"> */}
                        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex d-md-flex justify-content-md-end">
                            <ul className="navbar-nav ">

                                {loggedIn && user && (
                                    <div className="navbar-nav">

                                        <NavLink
                                            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                            to="/home"
                                            onClick={() => document.getElementById('navbarTogglerDemo01')?.classList.remove('show')}
                                        >
                                            Inicio
                                        </NavLink>
                                        <NavLink
                                            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                            to="/mi-perfil"
                                            onClick={() => document.getElementById('navbarTogglerDemo01')?.classList.remove('show')}
                                        >
                                            Mi Perfil
                                        </NavLink>
<<<<<<< HEAD

=======
                                
>>>>>>> develop
                                        <NavLink
                                            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                            to="/Cursos"
                                            onClick={() => document.getElementById('navbarTogglerDemo01')?.classList.remove('show')}
                                        >
                                            Cursos
                                        </NavLink>


                                        <NavLink
                                            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                            to="/servicios"
                                            onClick={() => document.getElementById('navbarTogglerDemo01')?.classList.remove('show')}
                                        >
                                            Servicios
                                        </NavLink>

                                        <NavLink
                                            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                            to="/avisos"
                                            onClick={() => document.getElementById('navbarTogglerDemo01')?.classList.remove('show')}
                                        >
                                            Avisos
                                        </NavLink>

                                        <NavLink
                                            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                            to="/about"
                                            onClick={() => document.getElementById('navbarTogglerDemo01')?.classList.remove('show')}
                                        >
                                            Acerca
                                        </NavLink>

                                        <button className="nav-item nav-link btn navbar-text-white close-color" onClick={handleLogOut}>
                                            <i className="fa-solid fa-right-from-bracket me-2"></i>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

