//ESTE ES EL MODULO DE MATERIAS 
import React from 'react'
import TablaMat from '../componets/TablaMaterias'
import { Formulario} from '../componets/FormularioMaterias'

const Crear = () => {
    return (
      <div>
                        <h1 className='font-black text-4xl text-gray-500'>Registro de Materias</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar una nueva Materia</p>
            <Formulario/>
            <br></br>
            <br></br>
            <h1 className='font-black text-4xl text-gray-500'>Materias Registradas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite listar las materias registradas</p>
            <TablaMat/>
        </div>
    )
}

export default Crear