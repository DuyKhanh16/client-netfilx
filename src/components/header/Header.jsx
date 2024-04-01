import React, { useRef, useState } from 'react'
import './Header.scss'

import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
export default function Header() {
  const user= JSON.parse(localStorage.getItem("currentUser"))||{}


 
  // modal user
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const logOut=()=>{
    const check=confirm('bạn có muốn đăng xuất')
    if (check) {
      localStorage.clear()
      setTimeout(() => {
    window.location.reload()
        
      }, 2000);
    }
    
  }

  const goProfile=()=>{
    if (user.role==0) {
      alert(`Chuyển tới ${user.userName}`)
        window.location.href="/user"
    }else{
      alert(`Chuyển tới ${user.userName}`)
        window.location.href="/admin"
      
    }
  }

  return (
    <div className='header'>
      <div className="header_nav" >
        <img onClick={()=>{window.location.href="/"}} style={{cursor:'pointer'}} width={100} height={30} src="https://cdn.icon-icons.com/icons2/2699/PNG/96/netflix_official_logo_icon_168085.png" alt="" />
        <p>Trang chủ</p>
        <p>Thể loại phim</p>
        <p>Phim mới& phổ biến</p>
        <p>Phim của tôi</p>
      </div>
      <div className="header_user">
      
      <i style={{fontSize:25}} class="fa-solid fa-bell"></i>
      {user.userName?  <img onClick={handleClick} width={40} src={user?.avata} alt="avata" style={{cursor:'pointer',borderRadius:10}} />:<p onClick={()=>{window.location.href="/login"}} style={{cursor:'pointer',marginTop:10,marginLeft:5}}>Đăng nhập</p>}
      </div>

      <div ref={ref}>

      <Overlay 
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
        
      >
        <Popover style={{width:200}} id="popover-contained">
          <Popover.Header style={{backgroundColor:'black',color:'white',textAlign:"center"}} as="h3">{user.userName}</Popover.Header>
          <Popover.Body style={{backgroundColor:"black"}}>
            <p onClick={goProfile} style={{color:"white",textAlign:"center",cursor:"pointer"}}>Thông tin cá nhân</p>
            <p style={{color:"white",textAlign:"center"}}>VIP <i style={{color:"gold"}} class="fa-solid fa-star"></i>:
            {user?.userVip==0?'Chưa':`${user?.userVip==1?"VIP 1":"VIP 2"}`}
            </p>
            <br />
            <Button onClick={logOut} style={{marginLeft:30}} >Đăng Xuất</Button>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>

    </div>
  )
}
