import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { Register } from './paginas/Register'
import Dashboard from './layout/Dashboard'
import Estudiantes from './paginas/Estudiantes'
import Visualizar from './paginas/Visualizar'
import VisualizarMat from './paginas/VisualizarMaterias'
import VisualizarMatri from './paginas/VisualizarMatriculas'
import Materias from './paginas/Materias'
import Matriculas from './paginas/Matriculas'
import Actualizar from './paginas/Actualizar'
import ActualizarMat from './paginas/ActualizarMateria'
import ActualizarMatri from './paginas/ActualizarMatriculas'
import Perfil from './paginas/Perfil'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoutes'
import { TratamientosProvider } from './context/TratamientosProvider'
import PrivateRouteWithRole from './routes/PrivateRouteWithRole'


function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <TratamientosProvider>
      <Routes>
        
        <Route index element={<Login/>}/>

        <Route path='/' element={<Auth/>}>
          
          <Route path='register' element={<Register/>}/>

        </Route>

        <Route path='dashboard/*' element={
                <PrivateRoute>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={<Perfil />} />
                      <Route path='estudiantes' element={<Estudiantes />} />
                      <Route path='visualizar/:id' element={<Visualizar />} />
                      <Route path='visualizarMat/:id' element={<VisualizarMat/>} />
                      <Route path='visualizarMatri/:id' element={<VisualizarMatri/>} />
                      <Route path='materias' element={
                        <PrivateRouteWithRole>
                          <Materias />
                        </PrivateRouteWithRole>
                      }/>
                      <Route path='matriculas' element={
                        <PrivateRouteWithRole>
                          <Matriculas />
                        </PrivateRouteWithRole>
                      }/>
                      <Route path='actualizar/:id' element={<Actualizar />} />
                      <Route path='actualizarMat/:id' element={<ActualizarMat />} />
                      <Route path='actualizarMatri/:id' element={<ActualizarMatri />} />
                    </Route>
                  </Routes>
                </PrivateRoute>
          } />


      </Routes>
      </TratamientosProvider>
      </AuthProvider>      
    </BrowserRouter>
    </>
  )
}

export default App
