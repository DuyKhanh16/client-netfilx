import React from 'react'
import './headerAdmin.scss'
import { NavLink } from 'react-router-dom'

export default function HeaderAdmin() {
  const admin= JSON.parse(localStorage.getItem("currentUser"))||{}

  const logOut=()=>{
    const check=confirm('bạn có muốn đăng xuất')
    if (check) {
      localStorage.clear()
      setTimeout(() => {
    window.location.href="/"
      }, 2000);
    }
  }
  
  const goHome=()=>{
    
    window.location.href="/"
  
  }
 const goFlim=()=>{

  }
  const goUser=()=>{

  }
  const goDoanhThu=()=>{
    
  }
  return (
    <div className='adminHeader'>
        <div  className="adminHearder_logo" >
            <img onClick={goHome} style={{cursor:"pointer"}}  width={100} src="https://cdn.icon-icons.com/icons2/2699/PNG/512/netflix_official_logo_icon_168085.png" alt="" />
           <p style={{cursor:"pointer"}} onClick={goFlim} ><NavLink className="link" to={"/admin"}>Phim Admin</NavLink></p>
            <p style={{cursor:"pointer"}} onClick={goUser}><NavLink className="link" to={"/adminUser"}>User</NavLink></p>
            <p style={{cursor:"pointer"}} onClick={goDoanhThu}><NavLink className="link" to={"/adminDoanhThu"}>Doanh Thu</NavLink></p>
        </div>
        <div className="adminHeader_user">
            <img width={50} src={admin.avata} style={{borderRadius:10}} alt="avata" />
            <p onClick={logOut}>Logout</p>
        </div>
    </div>
  )
}
