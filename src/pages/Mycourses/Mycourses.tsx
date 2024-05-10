import { useEffect } from "react";
//import { fetchMyCourses } from "../../redux/reducers/mycoursesSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { MycoursesTable } from "./components/MycoursesTable";
import { fetchCursos } from "../../redux/reducers/cursosSlice";

const Mycourses = () => {
    //debo de mostrar los datos de los cursos que el usuario tiene inscritos
    // Deben de aparecer los siguientes campos: Nombre, Horario, Modalidad, Estado
    // El estado debe de ser Aprovado,Reprobado, En curso, En espera.
    //Se debe de buscar en los cursos Postulados, Matriculados, Aprobados, Reprobados.
    // Si se encuentra el usuario en ese curso tambien:
    // nombre, horario, modalidad, estado.
    const dispatch = useAppDispatch()
    useEffect(() => {
        //dispatch(fetchMyCourses())
        dispatch(fetchCursos())
    }, [])
  return (
    <>
    <div className="container">
      <h1>Lista de cursos</h1>
      <span>En esta sección podrás ver los cursos en los que te encuentras inscrito.</span>
      <MycoursesTable/>
    </div>
    </>

  )
}

export default Mycourses