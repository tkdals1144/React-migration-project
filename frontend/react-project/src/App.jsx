import { useState } from 'react'
import MainPage from './componets/Main/MainPage.jsx'
import './App.css'
import { Header, Footer, Login, Signup, Info } from './componets'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);
  
  // header/footer 제외할 경로
  const noLayoutRoutes = ["/login", "/signup", "/board"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header/>}
      <Routes>
        <Route path='/' element = {<MainPage/>}/>
        <Route path='/main' element = {<Navigate to='/' replace/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/info' element = {<Info/>}/>
      </Routes>
      {!hideLayout && <Footer/>}
    </>
  )
}

export default App