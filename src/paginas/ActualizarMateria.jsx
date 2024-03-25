import { Formulario } from '../componets/FormularioMaterias';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';

const Actualizar = () => {
    const { id } = useParams();
    const [materias, setMaterias] = useState([]);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarMaterias = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}materias/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setMaterias(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarMaterias();
    }, []);

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Materia</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de una materia registrada</p>
            {
                materias.length !== 0 ?
                    (
                        <Formulario materias={materias}/>
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
