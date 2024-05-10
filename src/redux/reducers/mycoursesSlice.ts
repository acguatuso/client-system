import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getFirebaseDocs } from '../../api/getFirebaseDocs/getFirebaseDocs';
//import { getFirebaseDocs } from '../../api/getFirebaseDocs/getFirebaseDocs';
//import Mycourses from '../../pages/Mycourses/Mycourses';


interface MyCoursesState {
    loading: boolean,
    error: string | undefined,
    courses: course[]

}

export type course = {
    nombre: string,
    horario: any,
    modalidad: number,
    postulados: [],
    matriculados: [],
    aprobados: [],
    reprobados: []
}

//thunks
export const fetchMyCourses = createAsyncThunk(
    'mycourses/fetchMyCourses',
    async () => {        
        const docSnap = await getFirebaseDocs('/Cursos')
        const data: course[] = docSnap.map((doc: any) => { 
            return {
                nombre: doc.nombre,
                horario: doc.horario,
                modalidad: doc.modalidad,
                postulados: doc.postulados,
                matriculados: doc.matriculados,
                aprobados: doc.aprobados,
                reprobados: doc.reprobados
            }
        })
        console.log(data, 'data')
        return data
    }
)

const initialState: MyCoursesState = {
    loading: false,
    error: undefined,
    courses: [] as course[]
}

const mycourses =  createSlice({
    name: 'mycourses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
        builder.addCase(fetchMyCourses.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchMyCourses.fulfilled, (state,action: PayloadAction<course[]>) => {
            state.loading = false,            
            state.courses = action.payload               

        });
        builder.addCase(fetchMyCourses.rejected, (state,action) => {
            state.loading = false
            state.error = action.error.message;            
        });    
    }
}
)

export const myCoursesSelector = (state: RootState) => state.misCursos
export default mycourses.reducer;