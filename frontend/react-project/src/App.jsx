import { useState } from 'react'
import MainPage from './components/Main/MainPage.jsx'
import './App.css'
import { Header, Footer, Login, Signup, Info, Mypage } from './components'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState(null);
  
  // header/footer 제외할 경로
  const noLayoutRoutes = ["/login", "/signup", "/board", "/mypage"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header email={email} setEmail={setEmail}/>}
      <Routes>
        <Route path='/' element = {<MainPage/>}/>
        <Route path='/main' element = {<Navigate to='/' replace/>}/>
        <Route path='/login' element = {<Login setUser={setEmail}/>}/>
        <Route path='/signup' element = {<Signup setUser={setEmail}/>}/>
        <Route path='/info' element = {<Info/>}/>
        <Route path='/mypage' element = {<Mypage email={email}/>}/>
      </Routes>
      {!hideLayout && <Footer/>}
    </>
  )
}

export default App