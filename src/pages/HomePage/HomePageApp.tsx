import { useState, useRef, useEffect } from 'react';
import './HomePageApp.css'
import { getFirebaseDoc } from '../../api/getFirebaseDoc/getFirebaseDoc';
import { ref, getDownloadURL } from 'firebase/storage';
import { firebase_storage } from '../../firebase';
import HomeTables from './HomeTables';
import { useSelector } from 'react-redux';
import { fetchStatisticsData } from '../../redux/reducers/statisticsSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { RootState } from '../../redux/store';

export const HomePageApp = () => {
    //informacion de FireStore
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [image_url, setImageUrl] = useState('');
    const editRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    // Acceder a los valores numéricos del estado del slice de estadísticas
    const { cursosActivos, aprobadosTotales } = useSelector((state: RootState) => state.statistics);

    // Llamar a la acción para cargar los datos de estadísticas al montar el componente
    useEffect(() => {
        dispatch(fetchStatisticsData());
    }, [dispatch]);

    useEffect(() => {
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
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row text-start">
                    {/* Contenido del lado izquierdo */}
                    <div className="col-sm-5">
                        <h2 className='fw-bold color-title mb-3'>{titulo}</h2>
                        <p>{descripcion} </p>
                    </div>

                    {/* Contenido del lado derecho */}
                    <div className="col-sm-7 " ref={editRef}>
                        <img
                            src={image_url}
                            alt="Imagen de página de inicio,"
                            className='img-fluid rounded shadow-lg'
                        />
                    </div>
                </div>
                <div className="row">
                    <HomeTables
                        totalCursos={cursosActivos}
                        estudiantesCertificados={aprobadosTotales}
                    />
                </div>
            </div>
        </>
    )
}