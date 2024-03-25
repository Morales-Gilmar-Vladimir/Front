//ESTE ES EL MODULO DE MATERIAS 
import React from 'react'
import TablaMatri from '../componets/TablaMatriculas'
import { Formulario} from '../componets/FormularioMatriculas'

const Crear = () => {
    return (
      <div>
                        <h1 className='font-black text-4xl text-gray-500'>Registro de Matriculas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar una nueva Matricula</p>
            <Formulario/>
            <br></br>
            <br></br>
            <h1 className='font-black text-4xl text-gray-500'>Matriculas Registradas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite listar las matriculas registradas</p>
            <TablaMatri/>
        </div>
    )
}

export default Crear