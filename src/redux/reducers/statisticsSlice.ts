import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { data_base } from '../../firebase';
import { collection, getDocs, query, where} from 'firebase/firestore';

type StatisticsState = {
  cursosActivos: number;
  aprobadosTotales: number;
};

const initialState: StatisticsState = {
  cursosActivos: 0,
  aprobadosTotales: 0,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setCursosActivos: (state, action: PayloadAction<number>) => {
      state.cursosActivos = action.payload;
    },
    setAprobadosTotales: (state, action: PayloadAction<number>) => {
      state.aprobadosTotales = action.payload;
    },
  },
});

export const { setCursosActivos, setAprobadosTotales } = statisticsSlice.actions;
export default statisticsSlice.reducer;

export const fetchStatisticsData = (): AppThunk => async dispatch => {
  try {
    // Obtener cantidad de cursos activos
    const cursosActivos = await getCursosActivos();
    dispatch(setCursosActivos(cursosActivos));

    // Obtener cantidad de aprobados totales entre todos los cursos
    const aprobadosTotales = await getAprobadosTotales();
    dispatch(setAprobadosTotales(aprobadosTotales));
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
  }
};

const getCursosActivos = async (): Promise<number> => {
  try {
    const cursosCollectionRef = collection(data_base, 'Cursos');
    const cursosSnapshot = await getDocs(cursosCollectionRef);
    return cursosSnapshot.size;
  } catch (error) {
    console.error('Error al obtener cursos activos:', error);
    return 0;
  }
};

const getAprobadosTotales = async (): Promise<number> => {
  try {
    const cursosCollectionRef = collection(data_base, 'Cursos');
    const cursosQuery = query(cursosCollectionRef, where('estado', '==', 1));
    const cursosSnapshot = await getDocs(cursosQuery);
    
    let totalAprobados = 0;
    cursosSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.aprobados && Array.isArray(data.aprobados)) {
        totalAprobados += data.aprobados.length;
      }
    });
    
    return totalAprobados;
  } catch (error) {
    console.error('Error al obtener aprobados totales:', error);
    return 0;
  }
};
