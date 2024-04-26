import { useState, useRef, useEffect } from 'react';
import './HomePageApp.css'
import { getFirebaseDoc } from '../../api/getFirebaseDoc/getFirebaseDoc';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ref, getDownloadURL }from 'firebase/storage';
import { firebase_storage } from '../../firebase';

export const HomePageApp = () => {
    //informacion de FireStore
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [image_url, setImageUrl] = useState('');

    const navigate = useNavigate();
    // Redux Hooks & Access
    const user = useSelector((state: RootState) => state.auth.user);
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const editRef = useRef<any>(null);

    useEffect(() => {
        if (!loggedIn && !user) {
            navigate("/");
        }
        
        const imageRef = ref(firebase_storage, 'Home/imagen-inicio');
        getDownloadURL(imageRef)
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.error('Error descargando la imagen:', error);
            });
        (async () => {
            const docSnap = await getFirebaseDoc('/Home/8Yl9xbZuRNFTUItTEKGU');

            setTitulo(docSnap?.titulo);
            setDescripcion(docSnap?.descripcion);

        })()
    }, [loggedIn, user, navigate]);

    return (
        <>
            {loggedIn && (
                <div className="container mt-5">
                    <div className="row text-start">
                        {/* Contenido del lado izquierdo */}
                        <div className="col-sm-5">
                            <h2 className='fw-bold color-title mb-3'>{titulo}</h2>
                            <p>{descripcion} </p>
                        </div>

                        {/* Contenido del lado derecho */}
                        <div className="col-sm-7" ref={editRef}>
                            <img
                                src={image_url}
                                alt="Imagen de página de inicio,"
                                className='img-fluid rounded'
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}