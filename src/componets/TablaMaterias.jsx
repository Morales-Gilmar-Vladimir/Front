import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";

const Tabla = () => {
    const [materias, setMaterias] = useState([]);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

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
            setMaterias(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarMaterias();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("Vas a eliminar una materia, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}materias/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                await axios.delete(url, { headers });
                listarMaterias();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {
                materias.length !== undefined
                    ? 
                    <table className='w-full mt-5 table-auto shadow-lg bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Código</th>
                                <th className='p-2'>Descripción</th>
                                <th className='p-2'>Créditos</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                materias.map((materia, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={materia._id}>
                                        <td>{index + 1}</td>
                                        <td>{materia.nombre}</td>
                                        <td>{materia.codigo}</td>
                                        <td>{materia.descripcion}</td>
                                        <td>{materia.creditos}</td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 " onClick={() => navigate(`/dashboard/visualizarMat/${materia._id}`)} />
                                            {
                                                auth.rol === "usuario" &&
                                                (
                                                    <>
                                                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/actualizarMat/${materia._id}`)} />
                                                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" onClick={() => { handleDelete(materia._id) }} />
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
