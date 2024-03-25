
import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useForm } from 'react-hook-form'

export const Formulario = ({ estudiantes }) => {
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [form, setForm] = useState({
        nombre: estudiantes?.nombre ?? "",
        apellido: estudiantes?.apellido ?? "",
        cedula: estudiantes?.cedula ?? "",
        fechaNacimiento: new Date(estudiantes?.fechaNacimiento).toLocaleDateString('en-CA', {timeZone: 'UTC'}) ?? "",
        ciudad: estudiantes?.ciudad ?? "",
        direccion: estudiantes?.direccion ?? "",
        telefono: estudiantes?.telefono ?? "",
        email: estudiantes?.email ?? ""
    });

    const handleChange = (e) => {
        setForm({...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async () => {
        if (estudiantes?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}estudiantes/actualizar/${estudiantes?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/estudiantes')
        }
        else {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}estudiantes/registrar`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta:"Estudiante registrado con exito", tipo: true })
                setTimeout(() => {
                    navigate('/dashboard/estudiantes');
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
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del Estudiante: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre del estudiante'
                    name='nombre'
                    {...register("nombre", {required: true})}
                    value = {form.nombre} onChange={handleChange}
                />
                {errors.nombre?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
            <div>
                <label
                    htmlFor='apellido:'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido del Estudiante: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Apellido del estudiante'
                    name='apellido'
                    {...register("apellido", {required: true})}
                    value = {form.apellido} onChange={handleChange}
                />
                {errors.apellido?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
            <div>
                <label
                    htmlFor='cedula:'
                    className='text-gray-700 uppercase font-bold text-sm'>Cedula: </label>
                              <input
                    id='cedula'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Cedula del estudiante'
                    name='cedula'
                    value = {form.cedula}
                    onChange={handleChange}
                />
                {errors.cedula?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
    
            <div>
                <label
                    htmlFor='fechaNacimiento:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de Nacimiento: </label>
                <input
                    id='fechaNacimiento'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Fecha de nacimiento del estudiante'
                    name='fechaNacimiento'
                    {...register("fechaNacimiento", {required: true})}
                    value={form.fechaNacimiento} onChange={handleChange}
                />
                {errors.fechaNacimiento?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
    
            <div>
                <label
                    htmlFor='ciudad:'
                    className='text-gray-700 uppercase font-bold text-sm'>Ciudad: </label>
                <input
                    id='ciudad'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ciudad del estudiante'
                    name='ciudad'
                    {...register("ciudad", {required: true})}
                    value = {form.ciudad} onChange={handleChange}
                />
                {errors.ciudad?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
    
            <div>
                <label
                    htmlFor='direccion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Direccion: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Direccion del estudiante'
                    name='direccion'
                    {...register("direccion", {required: true})}
                    value = {form.direccion} onChange={handleChange}
                />
                {errors.direccion?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
    
            <div>
                <label
                    htmlFor='telefono:'
                    className='text-gray-700 uppercase font-bold text-sm'>Telefono: </label>
                <input
                    id='telefono'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Telefono del estudiante'
                    name='telefono'
                    value = {form.telefono}
                    onChange={handleChange}
                />
                {errors.telefono?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
    
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email del estudiante'
                    name='email'
                    {...register("email", {required: true})}
                    value={form.email}
                    onChange={handleChange}
                />
                {errors.email?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>
            
    
            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                    value={estudiantes?._id ? 'Actualizar estudiante' : 'Registrar estudiante'} />
    
        </form>
    )
    
    
}