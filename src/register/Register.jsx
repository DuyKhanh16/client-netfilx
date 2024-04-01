import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./register.scss"
import publicAxios from '../axios.config/piublicAxios';
import { useNavigate } from "react-router-dom";


export default function Register() {
 
  const [user, setUser] = useState({
    userName:"",
    email:"",
    password:"",
    avata:"https://avatars.githubusercontent.com/u/6759280?v=4"
  })
  const naviLink = useNavigate()
  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  const signin =async () => {
    if (!user.email||!user.userName||!user.password) {
      alert("vui long nhap day du thong tin")
      return
      
    }
    try {
    await publicAxios.post("/api/v1/users/register",user)
    alert("Đăng ký thành công")
    setTimeout(() => {
      naviLink("/login")
    }, 2000);
      
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  }
  const goHome=()=>{
    naviLink("/")
  }
  const goLogin=()=>{
    naviLink("/login")
  }

  return (
    <div className='register'>
      <div className='register_block'>
      <img width={100} src="https://cdn.icon-icons.com/icons2/2699/PNG/512/netflix_logo_icon_170919.png" alt="" />
            <h1>SIGN IN </h1>
            <Form.Label htmlFor="inputPassword5">NAME :</Form.Label>
            <Form.Control onChange={changeValue} className='register_input' name='userName' required type="text" placeholder='CREATE NAME'  ></Form.Control>
            <Form.Label htmlFor="inputPassword5">EMAIL :</Form.Label>
            <Form.Control onChange={changeValue} className='register_input' name='email'  type="email" required placeholder='xxxxx@gmail.com' ></Form.Control>
            <Form.Label htmlFor="inputPassword5">PASSWORD :</Form.Label>
            <Form.Control onChange={changeValue} className='register_input' name='password' required  type="password" placeholder='CREATE PASSWORD' ></Form.Control>
            <Button className='register_bnt' onClick={signin} variant="success">SIGNIN</Button>{' '}
              <div className='register_nav'> 
              <p>Back to : <span onClick={goHome} style={{cursor:"pointer"}}>HOME?</span></p>
              <p>Back to : <span onClick={goLogin} style={{cursor:"pointer"}}>LOGIN?</span></p>
              </div>
            </div>
    </div>
  )
}
