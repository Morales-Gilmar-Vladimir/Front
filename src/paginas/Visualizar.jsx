import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Vizualizar = () => {
    const { id } = useParams();
    const [estudiante, setEstudiante] = useState({});
    const [mensaje, setMensaje] = useState({});
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const consultarEstudiante = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}estudiantes/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                console.log(respuesta)
                setEstudiante(respuesta.data.estudianteD);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarEstudiante();
        
    }, []);

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Vizualizar Estudiante</h1>
                {
                    Object.keys(estudiante).length !== 0 ? (
                        <>
                            <div className='m-5 flex justify-between'>
                                <div className='m-5' >
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Nombre del estudiante: </span>
                                        {estudiante.nombre}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Apellido del estudiante: </span>
                                        {estudiante.apellido}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Cédula: </span>
                                        {estudiante.cedula}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Dirección: </span>
                                        {estudiante.direccion}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Teléfono: </span>
                                        {estudiante.telefono}
                                    </p>
                                </div>
                                <div>
                                    <img src="https://cdn-icons-png.flaticon.com/512/2138/2138440.png" alt="avatar" className='h-80 w-80' />
                                </div>
                            </div>
                            <hr className='my-4' />
                            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                            <div className='flex justify-between items-center'>
                                <p>Este submódulo te permite visualizar los detalles del estudiante</p>
                            </div>
                        </>
                    ) : (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
                }
            </div>
        </>
    );
};

export default Vizualizar;
