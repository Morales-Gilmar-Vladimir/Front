import { Formulario } from '../componets/Formulario';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';

const Actualizar = () => {
    const { id } = useParams();
    const [estudiantes, setEstudiantes] = useState([]);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarEstudiantes = async () => {
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
                setEstudiantes(respuesta.data.estudianteD);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarEstudiantes();
    }, []);

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Estudiante</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de un estudiante registrado</p>
            {
                estudiantes.length !== 0 ?
                    (
                        <Formulario estudiantes={estudiantes}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>
    );
};

export default Actualizar;
