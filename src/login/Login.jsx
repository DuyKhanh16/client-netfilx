import React, { useState } from 'react'
import "./login.scss"
import publicAxios from '../axios.config/piublicAxios';
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [user,setUser]=useState({
    email:"",
    password:""
  })
  const naviLink = useNavigate()
const changeValue=(e)=>{
 setUser({...user,[e.target.name]:e.target.value})
}

const login= async()=>{
  if (!user.email||!user.password) {
    alert("Vui lòng nhập đủ thông tin")
    return
}
try {
  const result = await publicAxios.post("/api/v1/users/login",user)
  alert("Đăng nhập thành công")
  localStorage.setItem("currentUser",JSON.stringify(result.data.user))
  localStorage.setItem("token",result.data.token)
  if (result.data.user.role===1) {
    setTimeout(() => {
      naviLink("/admin")
    }, 2000);
  } else {
    setTimeout(() => {
      naviLink("/")
    }, 2000);
  }

} catch (error) {
  console.log(error);
  alert(error.response.data.message)
}
}
const goRegister=()=>{
  naviLink("/register")
}
  return (
    <div className='login'>
        <img width={170} src="https://cdn.icon-icons.com/icons2/2699/PNG/512/netflix_official_logo_icon_168085.png" alt="" />
        <div className='login_block'>
            <h1>Đăng Nhập</h1>
            <input onChange={changeValue} name='email' type="text" placeholder='Email hoặc số điện thoại' id="" />
            <input onChange={changeValue} name='password' type="password" placeholder='Mật Khẩu' />
            <button onClick={login}>Đăng Nhập</button>
        <p>Bạn mới tham gia Netflix? <span onClick={goRegister} style={{hover:"blue",cursor:"pointer"}}>Đăng Ký ngay</span></p>
        </div>
    </div>
  )
  }
