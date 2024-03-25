//ESTE ES EL MODULO ESTUDIANTES
import React from 'react'
import Tabla from '../componets/Tabla'
import { Formulario } from '../componets/Formulario'


const Listar = () => {
    return (

        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registro de Estudiante</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar un nuevo Estudiante</p>
            <Formulario />
            <br></br>
            <br></br>
            <h1 className='font-black text-4xl text-gray-500'>Estudiantes Registrados</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite listar los estudiantes registrados</p>
            <Tabla/>
        </div>
    )
}

export default Listar