import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Curso } from "../../components/gestion_cursos/curso.interface";
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";

export interface CursoState {
  loading: boolean;
  cursos: Array<Curso>;
  numSolicitantes: { [idCurso: string]: number };
  error: string | undefined;
}

const initialState: CursoState = {
  loading: false,
  cursos: [],
  numSolicitantes: {},
  error: undefined,
};

export function obtenerNombreModalidad(numeroModalidad: number): string {
  switch (numeroModalidad) {
    case 0:
      return "Presencial";
    case 1:
      return "Virtual";
    case 2:
      return "Mixta";
    default:
      return "No Definida";
  }
}

export const fetchCursos = createAsyncThunk("users/fetchCursos", async () => {
  const docSnap = await getFirebaseDocs("Cursos");
  const data = docSnap as Curso[];
  /* console.log(data) */

  // Calcula el número de solicitantes para cada curso y actualiza el estado numSolicitantes
  const numSolicitantes: { [idCurso: string]: number } = {};
  data.forEach((curso) => {
    if (curso.id) {
      // Verifica que curso.id esté definido
      numSolicitantes[curso.id] = curso.postulados!.length;
    }
  });

  // Filtrar los cursos que tienen una fecha de creación definida
  const cursosConFechaCreacion = data.filter(
    (curso) => curso.fechaCreacion !== undefined
  );

  // Ordenar los cursos por fecha de creación descendente
  const cursosOrdenados = cursosConFechaCreacion.sort((a, b) => {
    return b.fechaCreacion!.toMillis() - a.fechaCreacion!.toMillis();
  });

  return { cursos: cursosOrdenados, numSolicitantes }; //return cursosOrdenados;
});

const cursosSlice = createSlice({
  name: "cursos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCursos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCursos.fulfilled,
      (
        state,
        action: PayloadAction<{
          cursos: Curso[];
          numSolicitantes: { [idCurso: string]: number };
        }>
      ) => {
        state.loading = false;
        state.cursos = action.payload.cursos;
        state.numSolicitantes = action.payload.numSolicitantes;
      }
    );
    builder.addCase(fetchCursos.rejected, (state, action) => {
      state.loading = false;
      state.cursos = [];
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const cursosSelector = (state: RootState) => state.cursos;
export default cursosSlice.reducer;
