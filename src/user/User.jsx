import React, { useState } from 'react'
import Fotter from '../components/fotter/Fotter'
import UserHeader from './userHeader/UserHeader'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import publicAxios from '../axios.config/piublicAxios';
export default function User() {
  const user= JSON.parse(localStorage.getItem("currentUser"))||{}

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const byVip = async(id) => {
    try {
      const result= await publicAxios.patch(`/api/v1/user/${user.userId}`,{userVip:2})
      if (result.status==201) {
        alert("Vui lòng đăng nhập lại để sử dụng VIP")
      }
      setShow(false)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{backgroundColor:"#F2F2F2"}} >
        <UserHeader></UserHeader>
        <div style={{width:1000,margin:"0 auto",height:"600px"}}>
        <h1 style={{fontWeight:300,borderBottom:"1px solid gray",padding:20}}>Tài Khoản</h1>
        <div style={{display:"flex",justifyContent:"space-between",padding:20 ,borderBottom:"1px solid gray"}}>
        <h3 style={{fontWeight:300,opacity:0.7}}>Thông Tin Cá Nhân :</h3>
   
        <div style={{width:500}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"                                                       }} ><img style={{width:100,height:100,borderRadius:20}} src={user?.avata} alt="" />
        <p style={{cursor:"pointer",color:"blue"}}>Thay Đổi Avata</p>
        </div>
        <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}   >
        <h3 style={{fontWeight:300,opacity:0.7}}>Tên : <span style={{color:"red", fontWeight:400}}>{user?.userName}</span></h3>
        <p style={{cursor:"pointer",color:"blue"}}>Thay Đổi Tên</p>
        </div>
        <div>
        <h4 style={{fontWeight:300,opacity:0.7}}>Email : <span style={{color:"black", fontWeight:400}}>{user?.email}</span></h4>
        </div>
        <div>
            <h4 style={{fontWeight:300,opacity:0.7}}>Trạng Thái: &nbsp; <span style={{color:"green", fontWeight:400}}>{user?.status}</span></h4>
        </div>
        </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",padding:20 ,borderBottom:"1px solid gray"}}>
            <h2 style={{fontWeight:300,opacity:0.7}}>Thông Tin Gói Dich Vụ :</h2>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:500}}>
                <p>{user.userVip==0?"Chưa Đăng Ký":`${user.userVip==1?"Gói VIP1":"Gói VIP2"}`}</p>
                <Button onClick={handleShow}>Mua VIP</Button>
            </div>
        </div>
        </div>
        <Fotter></Fotter>
        
      <Modal
      size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nâng Cấp VIP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
          <h4 style={{fontWeight:600,color:"red"}}>Gói VIP1</h4>
          <p><span>Mô Tả:</span> Gói VIP 1 Cung cấp dịch vụ chặn quảng cáo, đem lại trải nghiệm xem phim mượt mà, liên tục.</p>
          <p>Giá Tính: 100.000 VND</p>
          <Button style={{backgroundColor:"gray",border:"none"}}>Tạm Ngưng....</Button>
        </div>
        <div>
        <h4 style={{fontWeight:600,color:"red"}}>Gói VIP 2</h4>
        <p><span>Mô Tả:</span> Bao Gồm Gói Vip 1 và mở toàn bộ phim mới nhất</p>
        <p>Giá Tính: 250.000 VND</p>
        <Button onClick={()=>byVip(user?.userid)} style={{backgroundColor:"brown",border:"none",visibility:`${user.userVip==2?"hidden":"visible"}`}}>Mua Ngay</Button>

        </div>
        </Modal.Body>
       
      </Modal>
    </div>
  )
}
