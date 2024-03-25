
import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useForm } from 'react-hook-form'

export const Formulario = ({ materias }) => {
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [form, setForm] = useState({
        nombre: materias?.nombre ?? "",
        codigo: materias?.codigo ?? "",
        descripcion: materias?.descripcion ?? "",
        creditos: materias?.creditos ?? ""
    });

    const handleChange = (e) => {
        setForm({...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async () => {
        if (materias?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}materias/actualizar/${materias?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/materias')
        }
        else {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}materias/crear`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta:"Materia registrada con exito", tipo: true })
                setTimeout(() => {
                    navigate('/dashboard/materias');
                }, 3000);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la Materia: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre materia'
                    name='nombre'
                    {...register("nombre", {required: true})}
                    value = {form.nombre} onChange={handleChange}
                />
                {errors.nombre?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
            <div>
                <label
                    htmlFor='codigo:'
                    className='text-gray-700 uppercase font-bold text-sm'>Codigo de la Materia: </label>
                <input
                    id='codigo'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Codigo materia'
                    name='codigo'
                    {...register("codigo", {required: true})}
                    value = {form.codigo} onChange={handleChange}
                />
                {errors.codigo?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
        
            <div>
                <label
                    htmlFor='descripcion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Descripcion de la Materia: </label>
                <input
                    id='descripcion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Descripcion Materia'
                    name='descripcion'
                    {...register("descripcion", {required: true})}
                    value = {form.descripcion} onChange={handleChange}
                />
                {errors.descripcion?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
    
            <div>
                <label
                    htmlFor='creditos:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nº de Creditos: </label>
                <input
                    id='creditos'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Creditos'
                    name='creditos'
                    value = {form.creditos}
                    onChange={handleChange}
                />
                {errors.creditos?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>

    
            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                    value={materias?._id ? 'Actualizar Materia' : 'Registrar Materia'} />
    
        </form>
    )
    
    
}