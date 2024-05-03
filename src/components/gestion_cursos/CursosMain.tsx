import './CursosMain.css';
import { useEffect, useState } from 'react';
import Card from './Card';
import { Curso } from './curso.interface';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { cursosSelector, fetchCursos } from '../../redux/reducers/cursosSlice';


function CursosMain() {
  const [cursos, setCursos] = useState<Array<Curso>>([]);
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  // @ts-ignore
  const [error, setError] = useState<string | undefined>(undefined);
  const selectedCursos = useAppSelector(cursosSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchCursos())
    })()
  }, [dispatch])

  useEffect(() => { 
    setLoading(selectedCursos.loading);
    setError(selectedCursos.error);
    if (!selectedCursos.loading && !selectedCursos.error) {
      setCursos(selectedCursos.cursos);
    }
  }, [selectedCursos]) 

    
    return (
        <>
        <div className='row mt-4'>
            <div className='col bg-body-secondary p-4 me-md-3'>
                <h2 className="text-center">Cursos Disponibles</h2>
                <div className='row row-cols-1 row-cols-md-3 g-4'>
                    {cursos.filter(curso => curso.visible === 1).map((curso) => (
                        <div className="col" key={curso.id}>
                            <Card
                                to={`/curso/${curso.nombre}`}
                                title={curso.nombre}
                                image={curso.download_url}
                                visible={curso.visible}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-md-3 bg-info-subtle p-4 ms-md-3 mt-4 mt-md-0'>
                <h2>Próximamente</h2>
                <div className="row">
                    {cursos.filter(curso => curso.visible === 2).map((curso) => (
                        <div className="col" key={curso.id}>
                            <Card
                                to={`/curso/${curso.nombre}`}
                                title={curso.nombre}
                                image={curso.download_url}
                                visible={curso.visible}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default CursosMain;
