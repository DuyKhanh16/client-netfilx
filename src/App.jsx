import React from 'react'
import Register from './register/Register'
import Login from './login/Login'
import {Routes,Route} from "react-router-dom"
import Home from './home/Home'
import Admin from './pageAdmin/Admin'
import UserAdmin from './pageAdmin/userAdmin/userAdmin'
import PlayFlim from './playFlim/PlayFlim'
import User from './user/User'
import FlimDetail from './components/filmDetail/FlimDetail'

export default function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path='/register' element={<Register/>} ></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/adminUser' element={<UserAdmin/>}></Route>
          <Route path='/film/:id' element={<PlayFlim/>}></Route>
          <Route  path='/user' element={<User/>}></Route>
          <Route path='/flimDetail/:id' element={<FlimDetail/>}></Route>
      </Routes>
    </div>
  )
}
