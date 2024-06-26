import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import axios from 'axios'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensaje'
import {useForm} from 'react-hook-form'


const Login = () => {
    const {auth, setAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const {register, formState: {errors}, handleSubmit} = useForm()
    const [form, setform] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

	const onSubmit = async(e) => { 
	        //e.preventDefault()
            const url = `${import.meta.env.VITE_BACKEND_URL}login`;
	        try {
	            const respuesta= await axios.post(url,form)
	            localStorage.setItem('token',respuesta.data.token)
	            setAuth(respuesta.data)
	            navigate('/dashboard')
	        } catch (error) {
	            setMensaje({respuesta:error.response.data.msg,tipo:false})
	            setform({})
	            setTimeout(() => {
	                setMensaje({})
	            }, 3000);
	        }
	 }
     return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 h-screen bg-[url('/public/images/principal.png')] bg-no-repeat bg-cover bg-center">
                </div>
    
                <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">
                    <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-4">
                        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                        <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Bienvenido de vuelta</h1>
                        <small className="text-gray-400 block my-4 text-sm">Bienvenido! Ingresa tus credenciales</small>
    
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                                <input
                                    type="email"
                                    name='email'
                                    {...register('email', { required: true })}
                                    placeholder="Ingresa tu correo electrónico"
                                    value={form.email || ""}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                                />
                                {errors.email?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Correo necesario</p>}
                            </div>

                            <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                            <input 
                                    type="password" placeholder="********************" 
                                    {...register('password', {required: true})}
                                    value={form.password || ""}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" 
                            />
                            {errors.password?.type === 'required' && <p className="text-gray-400 my-2 text-xs">Contraseña necesaria</p>}
                        </div>
    
                            <div className="my-4">
                                <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Ingresar</button>
                            </div>
                        </form>
    
                        <div className="mt-3 text-sm flex justify-between items-center">
                            <p>¿No te has registrado aún?</p>
                            <Link to="/register" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Registrar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
 }    

export default Login