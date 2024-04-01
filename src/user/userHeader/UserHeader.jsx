import React from 'react'
import './userHeader.scss'

export default function HeaderAdmin() {
  const user= JSON.parse(localStorage.getItem("currentUser"))||{}

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
 
  return (
    <div className='adminHeader'>
        <div  className="adminHearder_logo" >
            <img onClick={goHome} style={{cursor:"pointer"}}  width={100} src="https://cdn.icon-icons.com/icons2/2699/PNG/512/netflix_official_logo_icon_168085.png" alt="" />
           
        </div>
        <div className="adminHeader_user">
            <img width={50} src={user.avata} style={{borderRadius:10}} alt="avata" />
            <p onClick={logOut} style={{cursor:"pointer",color:"blue"}}>Logout</p>
        </div>
    </div>
  )
}
