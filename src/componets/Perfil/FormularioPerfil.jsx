import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import Mensaje from "../Alertas/Mensaje"



const FormularioPerfil = () => {
    const {auth,actualizarPerfil} = useContext(AuthContext)
    const [form, setform] = useState({
				id: auth._id,
        nombre: auth.nombre || "",
        apellido:auth.apellido || "",
        email: auth.email || ""
    })
    const [mensaje, setMensaje] = useState({})

    const handleSubmit = async (e) => {
            e.preventDefault()
            if (Object.values(form).includes(""))
            {
                setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false })
                    setTimeout(() => {
                        setMensaje({})
                    }, 3000);
                            return
            }
            const resultado = await actualizarPerfil(form)
            setMensaje(resultado)
            setTimeout(() => {
                setMensaje({})
            }, 3000);
      }
    

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre'
                    name='nombre'
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='apellido'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido'
                    name='apellido'
                    value={form.apellido}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>


        </form>
    )
}

export default FormularioPerfil