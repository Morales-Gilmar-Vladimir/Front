import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";

const Tabla = () => {

    const [estudiantes, setEstudiantes] = useState([]);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

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
            setEstudiantes(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarEstudiantes();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("Vas a registrar la salida de un estudiante, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}estudiantes/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                const data = {
                    salida: new Date().toString()
                };
                await axios.delete(url, { headers, data });
                listarEstudiantes();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {
                estudiantes.length !== undefined 
                    ?
                    //console.log(estudiantes.length)
                    <table className='w-full mt-5 table-auto shadow-lg bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido</th>
                                <th className='p-2'>Cédula</th>
                                <th className='p-2'>Dirección</th>
                                <th className='p-2'>Teléfono</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estudiantes.map((estudiante, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={estudiante._id}>
                                        <td>{index + 1}</td>
                                        <td>{estudiante.nombre}</td>
                                        <td>{estudiante.apellido}</td>
                                        <td>{estudiante.cedula}</td>
                                        <td>{estudiante.direccion}</td>
                                        <td>{estudiante.telefono}</td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 " onClick={() => navigate(`/dashboard/visualizar/${estudiante._id}`)} />

                                            {
                                                auth.rol === "usuario" &&
                                                (
                                                    <>
                                                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" 
                                                        onClick={() => navigate(`/dashboard/actualizar/${estudiante._id}`)} 
                                                        />
                                            
                                                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" 
                                                        onClick={() => { handleDelete(estudiante._id) }}
                                                        />
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>   
                }
        </>
    );
};

export default Tabla;

