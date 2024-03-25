import { useContext } from "react"
import AuthContext from "../../context/AuthProvider"

export const CardPerfilPaciente = () => {
    const { studentDetails } = useContext(AuthContext);

    return (
        <div className="bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg">

            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="m-auto " width={120} height={120} />
            </div>
            <div className="self-start">
                <b>Nombre del Estudiante:</b><p className="inline-block ml-3">{studentDetails.nombre}</p>
            </div>
            <div className="self-start">
                <b>Apellido del Estudiante:</b><p className="inline-block ml-3">{studentDetails.apellido}</p>
            </div >
            <div className="self-start">
                <b>Cédula:</b><p className="inline-block ml-3">{studentDetails.cedula}</p>
            </div>
            <div className="self-start">
                <b>Dirección:</b><p className="inline-block ml-3">{studentDetails.direccion}</p>
            </div>
            <div className="self-start">
                <b>Teléfono:</b><p className="inline-block ml-3">{studentDetails.telefono}</p>
            </div>
        </div>
    )
}
