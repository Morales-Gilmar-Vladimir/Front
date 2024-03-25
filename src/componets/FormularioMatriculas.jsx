//aqui esta con la cedula del estudiante y el codigo de materia 
import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useForm } from 'react-hook-form'

export const Formulario = ({ matriculas }) => {
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [form, setForm] = useState({
        codigo: matriculas?.codigo ?? "",
        descripcion: matriculas?.descripcion ?? "",
        cedula: "",
        codigoMateria: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async () => {
        try {
            if (matriculas?._id) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}matriculas/actualizar/${matriculas?._id}`
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.put(url, form, options)
                navigate('/dashboard/matriculas')
            } else {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}matriculas/registrar`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta: "Matricula registrada con exito", tipo: true })
                setTimeout(() => {
                    navigate('/dashboard/matriculas');
                }, 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
        console.log(form);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='codigo:'
                    className='text-gray-700 uppercase font-bold text-sm'>Codigo de la Matricula: </label>
                <input
                    id='codigo'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Codigo matricula'
                    name='codigo'
                    {...register("codigo", { required: true })}
                    value={form.codigo} onChange={handleChange}
                />
                {errors.codigo?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>

            <div>
                <label
                    htmlFor='descripcion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Descripcion de la Matricula: </label>
                <input
                    id='descripcion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Descripcion matricula'
                    name='descripcion'
                    {...register("descripcion", { required: true })}
                    value={form.descripcion} onChange={handleChange}
                />
                {errors.descripcion?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
            </div>

            {/* Solo mostrar los campos de cedula y codigoMateria en modo de registro */}
            {!matriculas?._id && (
                <>
                    <div>
                        <label
                            htmlFor='cedula:'
                            className='text-gray-700 uppercase font-bold text-sm'>Cedula estudiante: </label>
                        <input
                            id='cedula'
                            type="number"
                            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                            placeholder='Cedula estudiante'
                            name='cedula'
                            {...register("cedula", { required: true })}
                            value={form.cedula} onChange={handleChange}
                        />
                        {errors.cedula?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
                    </div>

                    <div>
                        <label
                            htmlFor='codigoMateria:'
                            className='text-gray-700 uppercase font-bold text-sm'>Codigo de la Materia: </label>
                        <input
                            id='codigoMateria'
                            type="text"
                            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                            placeholder='Codigo materia'
                            name='codigoMateria'
                            {...register("codigoMateria", { required: true })}
                            value={form.codigoMateria} onChange={handleChange}
                        />
                        {errors.codigoMateria?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Campo requerido</p>}
                    </div>
                </>
            )}

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                    value={matriculas?._id ? 'Actualizar Matricula' : 'Registrar Matricula'} />

        </form>
    )
}