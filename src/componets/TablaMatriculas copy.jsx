// se extraen los datos del nombre cedula y el codigo de materia 
import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";

const Tabla = () => {
    const [matriculas, setMatriculas] = useState([]);
    const [cedulasEstudiantes, setCedulasEstudiantes] = useState([]);
    const [nombresEstudiantes, setNombresEstudiantes] = useState([]);
    const [codigosMaterias, setCodigosMaterias] = useState([]); 
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const listarMatriculas = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}matriculas`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            console.log(respuesta.data); 
            setMatriculas(respuesta.data.matriculasL);
        } catch (error) {
            console.log(error);
        }
    };

    const listarEstudiantes = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}estudiantes/listar`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            const cedulas = respuesta.data.map(estudiante => estudiante.cedula);
            setCedulasEstudiantes(cedulas);

            const nombres = respuesta.data.map(estudiante => estudiante.nombre);
            setNombresEstudiantes(nombres);
        } catch (error) {
            console.log(error);
        }
    };

    const listarMaterias = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}materias/listar`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            const codigos = respuesta.data.map(materia => materia.codigo);
            setCodigosMaterias(codigos);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarMatriculas();
        listarEstudiantes();
        listarMaterias();
    }, []);

    const handleDelete = async (id, nombreEstudiante, cedulaEstudiante, codigoMateria) => {
        try {
            const confirmar = window.confirm("Vas a eliminar una matrícula, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}matriculas/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                await axios.delete(url, { headers });
                
                // Aquí puedes realizar acciones adicionales con los datos de estudiante y materia si es necesario
                console.log("Nombre del estudiante:", nombreEstudiante);
                console.log("Cédula del estudiante:", cedulaEstudiante);
                console.log("Código de la materia:", codigoMateria);
    
                listarMatriculas();
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <>
            {
                matriculas.length === 0
                    ? <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre Estudiante</th>
                                <th className='p-2'>Código Matricula</th>
                                <th className='p-2'>Descripción Matricula</th>
                                <th className='p-2'>Cédula</th>
                                <th className='p-2'>Código de Materia</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                matriculas.map((matricula, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={matricula._id}>
                                        <td>{index + 1}</td>
                                        <td>{nombresEstudiantes[index]}</td>
                                        <td>{matricula.codigo}</td>
                                        <td>{matricula.descripcion}</td>
                                        <td>{cedulasEstudiantes[index]}</td>
                                        <td>{codigosMaterias[index]}</td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 " onClick={() => navigate(`/dashboard/visualizarMatri/${matricula._id}`)} />
                                            {
                                                auth.rol === "usuario" &&
                                                (
                                                    <>
                                                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/actualizarMatri/${matricula._id}`)} />
                                                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" onClick={() => { handleDelete(matricula._id, 
                                                                                                                                                                        nombresEstudiantes[index], 
                                                                                                                                                                        cedulasEstudiantes[index], 
                                                                                                                                                                        codigosMaterias[index]) }} />
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </>
    );
};

export default Tabla;

/*import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";

const Tabla = () => {
    const [matriculas, setMatriculas] = useState([]);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const listarMatriculas = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}matriculas`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            console.log(respuesta.data); 
            setMatriculas(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarMatriculas();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("Vas a eliminar una matrícula, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}matriculas/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                await axios.delete(url, { headers });
                
                listarMatriculas();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {
                matriculas.length === 0
                    ? <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Código Matricula</th>
                                <th className='p-2'>Descripción Matricula</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                matriculas.map((matricula, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={matricula._id}>
                                        <td>{index + 1}</td>
                                        <td>{matricula.codigo}</td>
                                        <td>{matricula.descripcion}</td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 " onClick={() => navigate(`/dashboard/visualizarMatri/${matricula._id}`)} />
                                            {
                                                auth.rol === "usuario" &&
                                                (
                                                    <>
                                                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/actualizarMatri/${matricula._id}`)} />
                                                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" onClick={() => { handleDelete(matricula._id) }} />
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </>
    );
};

export default Tabla;
*/ 