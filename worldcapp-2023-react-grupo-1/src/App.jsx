import './App.css'
import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { NavBar } from './components/nav-bar/NavBar'
import { Login } from './pages/login/Login'
import { Home } from './pages/home/Home'
import Header from './components/shared/header/Header'
import { Figuritas } from './pages/figuritas/figuritas'
import { PuntoDeVenta } from './pages/puntoDeVenta/PuntoDeVenta'
import { PuntoDeVentaForm } from './pages/puntoDeVenta/PuntoDeVentaForm'
import { Jugadores } from './pages/jugadores/Jugadores'
import { JugadoresForm } from './pages/jugadores/JugadoresForm'
import { FiguritasForm } from './pages/figuritas/figuritasForm'
import { Selecciones } from './pages/selecciones/Selecciones'
import { PopUp } from './components/shared/popup/PopUp'

function App() {
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname)
  const [msgErrorPopUp, setMsgErrorPopUp] = useState('')
  const [colorMsgErrorPopUp, setColorMsgErrorPopUp] = useState('var(--warning)')
  const [showErrorPopUp, setShowErrorPopUp] = useState()

  const doThenShowMsg = async (func, successMsg, errorMsg) => {
    let showMsg = false
    try{
      await func()
      if(successMsg != ''){
        setMsgErrorPopUp(successMsg)
        setColorMsgErrorPopUp('var(--success)')
        showMsg = true
      }   
    }
    catch(error){
      const msg = (error.response.data.message || error.response.data) || errorMsg
      if(msg != ''){
        setMsgErrorPopUp(msg)
        setColorMsgErrorPopUp('var(--warning)')
        showMsg = true
      }
      console.log(error, "aaaaaaaaaaaa")
    }
    finally{ setShowErrorPopUp(showMsg) }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const matchKeyWithHeader = (headers) => {
    let currHeader

    for (const key in headers) {
      if (currentUrl.includes(key)) {
           currHeader = headers[key]
          break 
      }   
  }
  return currHeader
  }

  const searchCurrentHeader = useCallback(() => {
    const headers = {
      // FORMS
      '/jugadores/agregar': 'Nuevo Jugador',
      '/jugadores/editar': 'Editar Jugador',
      '/figuritas/agregar': 'Nueva Figurita',
      '/figuritas/editar/': 'Editar Figurita',
      '/puntos-de-venta/agregar': 'Nuevo Punto',
      '/puntos-de-venta/editar/': 'Editar Punto',
      
      '/home': 'Home',
      '/figuritas': 'Figuritas',
      '/jugadores': 'Jugadores',
      '/puntos-de-venta': 'Puntos de Venta',
      '/selecciones': 'Selecciones',
    }

    const currHeader = matchKeyWithHeader(headers)

    return currHeader == undefined ? 'Home' : currHeader
    
  }, [matchKeyWithHeader])

  const [currentHeader, setCurrentHeader] = useState(searchCurrentHeader())
  const [userId, setUserId] = useState(localStorage.getItem('userId'))

  useEffect(() => {
    setCurrentHeader(searchCurrentHeader())
    setUserId(localStorage.getItem('userId'))
  }, [searchCurrentHeader])

  const handleNavChange = () => { setCurrentUrl(window.location.pathname) }

  const IsNotLogin = () => currentUrl != '/login'

  const redirection = () => userId ? "/home" : "/login"



  return (
    <BrowserRouter>
      <div className="App" data-testid="app">
        {IsNotLogin() ? <Header title={currentHeader} /> : <></>}
        <Routes>
          <Route path="/login" element={<Login doThenShowMsg={doThenShowMsg}/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/figuritas" element={<Figuritas doThenShowMsg={doThenShowMsg}/>} />
          <Route path="/jugadores" element={<Jugadores doThenShowMsg={doThenShowMsg}/>} />
          <Route path="/puntos-de-venta" element={<PuntoDeVenta doThenShowMsg={doThenShowMsg}/>} />
          <Route path="/selecciones" element={<Selecciones doThenShowMsg={doThenShowMsg}/>} />
          <Route path="*" element={<Navigate to={redirection()} />} />

          {/* FORMS */}
          <Route path="/jugadores/agregar" element={<JugadoresForm doThenShowMsg={doThenShowMsg}/>} />
          <Route path="/jugadores/editar/:id" element={<JugadoresForm doThenShowMsg={doThenShowMsg}/>} />
          <Route path="/figuritas/agregar" element={<FiguritasForm doThenShowMsg={doThenShowMsg}/>} />
          <Route path="/figuritas/editar/:id" element={<FiguritasForm doThenShowMsg={doThenShowMsg}/>} />
          <Route path="/puntos-de-venta/agregar" element={<PuntoDeVentaForm doThenShowMsg={doThenShowMsg}/>} />
          <Route path="/puntos-de-venta/editar/:id" element={<PuntoDeVentaForm doThenShowMsg={doThenShowMsg}/>} />
        </Routes>
        <NavBar changeFun={handleNavChange} />
        <PopUp
          show={showErrorPopUp}
          message={msgErrorPopUp}
          color={colorMsgErrorPopUp}
          setShow={setShowErrorPopUp}
        ></PopUp>
      </div>
    </BrowserRouter>
  )
}

export default App
