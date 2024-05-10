//import DataTableBase from "../../../components/dataTable/DataTableBase";
import { useAppSelector } from "../../../hooks/hooks";
//import { myCoursesSelector } from "../../../redux/reducers/mycoursesSlice";
import DataTableBase from "../../../components/dataTable/DataTableBase";
import { cursosSelector } from "../../../redux/reducers/cursosSlice";
import { CourseDetails } from "./CourseDetails";
import { Curso, Horario } from "../../../components/gestion_cursos/curso.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getFirebaseDocs } from "../../../api/getFirebaseDocs/getFirebaseDocs";
import { UserData } from "../../../redux/reducers/authSlice";
import { useEffect, useRef } from "react";
import { Timestamp } from "firebase/firestore";

export type userId = {
  idUsuario: string,
  userInfo: UserData
}

export type estadoList = {
  nombreCurso: string,
  estado: string

}

export type userCoursesList = {
  //id de curso
  id: string,
  nombre: string,
  horario: Horario[],
  download_url: string,
  descripcion: string,
  modalidad: number,
  fecha_inicio: Timestamp,
  fecha_finalizacion: Timestamp,
  link_plataforma: string,
  estado: string
}

export const MycoursesTable = () => {
    const courses = useAppSelector(cursosSelector)
    const user = useSelector((state: RootState) => state.auth.user?.correo)
    const searchState = async (idUsuario:string) => {
      let dataList: userCoursesList[] = []
      //busca en aprobados
      courses.cursos.map((curso: Curso) => {
        curso.aprobados?.filter((aprobado: string) => {
          console.log(aprobado, idUsuario)
          if(aprobado == idUsuario){
            console.log('entraaaa')
            const courseList: userCoursesList = { id: curso.id!, nombre: curso.nombre, horario: curso.horario, download_url: curso.download_url, descripcion: curso.descripcion, modalidad: curso.modalidad, fecha_inicio: curso.fecha_inicio, fecha_finalizacion: curso.fecha_finalizacion, link_plataforma: curso.link_plataforma, estado: "Aprobado"};
            dataList = [...dataList,courseList]
          }
        })
        //busca reprobados
        curso.reprobados?.filter((reprobado: string) => {
          console.log(reprobado, idUsuario)
          if(reprobado == idUsuario){
            console.log('entra reprobado')
            const courseList: userCoursesList = { id: curso.id!, nombre: curso.nombre, horario: curso.horario, download_url: curso.download_url, descripcion: curso.descripcion, modalidad: curso.modalidad, fecha_inicio: curso.fecha_inicio, fecha_finalizacion: curso.fecha_finalizacion, link_plataforma: curso.link_plataforma, estado: "Reprobado"};
            dataList = [...dataList,courseList]
          }
        })
        //postulado en espera...
        curso.postulados?.filter((postulado: any) => {
          console.log(postulado.id, idUsuario)
          if(postulado.id == idUsuario){
            console.log('entra postulado')
            const courseList: userCoursesList = { id: curso.id!, nombre: curso.nombre, horario: curso.horario, download_url: curso.download_url, descripcion: curso.descripcion, modalidad: curso.modalidad, fecha_inicio: curso.fecha_inicio, fecha_finalizacion: curso.fecha_finalizacion, link_plataforma: curso.link_plataforma, estado: "En espera"};
            dataList = [...dataList,courseList]
          }
        })
        //matriculado en curso
        curso.matriculados?.filter((matriculado: string) => {
          console.log(matriculado, idUsuario)
          if(matriculado == idUsuario){
            console.log('entra matriculado')
            const courseList: userCoursesList = { id: curso.id!, nombre: curso.nombre, horario: curso.horario, download_url: curso.download_url, descripcion: curso.descripcion, modalidad: curso.modalidad, fecha_inicio: curso.fecha_inicio, fecha_finalizacion: curso.fecha_finalizacion, link_plataforma: curso.link_plataforma, estado: "En curso"};
            dataList = [...dataList,courseList]
          }
        })
      })
      tableInfo.current = dataList
    }
    const searchUser = async (mail:string) =>  {    
      const data = await getFirebaseDocs('/Usuarios')
      const data1: userId[] = data.map((user: any) => {
        return {idUsuario: user.id as string, userInfo: user as UserData}
      })
      const data2:userId[] = data1.filter((user: userId) => user.userInfo.correo === mail)
      userId.current = data2[0].idUsuario
    }
    
    useEffect(() => {
      (async () => {
        await searchUser(user!)
        await searchState(userId.current!)
        console.log(tableInfo.current,'tableInfo') 
      })()           
    }, [])
    
    const userId = useRef<string>()    
    const tableInfo = useRef<userCoursesList[]>()
    const coursesList1 = tableInfo.current!
    const columns = [
        {
          name: "Nombre",
          selector: (row: any) => row.nombre,
          cell: (row: any) => <div className="text-start">{row.nombre}</div>,
          sortable: true,          
        },
        {
          name: "Horario",
          selector: (row: any) => row.horario,
          cell: (row: any) => (
            <div className='text-start'>
              {row.horario.map((h: any, index: number) => (
              <div key={index} className="row">
                  {h.dia}: {h.hora}
              </div>
              ))}
            </div>
          ), 
          sortable: true,                      
        },
        {
          name: "Modalidad",
          selector: (row: any) => row.modalidad,
          cell: (row: any) => (row.modalidad==0 ? "Presencial" : row.modalidad==1 ? "Virtual" : "Mixta"),
          sortable: true,
        
        },
        {
          name: "Estado",
          selector: (row: any) => row.estado,
          cell: (row: any) => (<div className="text-start">{row.estado}</div>), 
          sortable: true
        },
        {
          name: "Ver",
          cell: (row: userCoursesList) => (
            <CourseDetails {...row} />
          ),
        }        
      ];
    return (
    <>    
      <DataTableBase columns={columns} data={coursesList1}></DataTableBase>
    </>
  )
}
