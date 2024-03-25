import { Formulario } from '../componets/FormularioMatriculas';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';

const Actualizar = () => {
    const { id } = useParams();
    const [matriculas, setMatriculas] = useState([]);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarMatriculas = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}matriculas/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setMatriculas(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarMatriculas();
    }, []);

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Matrícula</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de una matrícula registrada</p>
            {
                matriculas.length !== 0 ?
                    (
                        <Formulario matriculas={matriculas}/>
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
