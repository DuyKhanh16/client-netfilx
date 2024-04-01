import React, { useEffect, useState } from 'react'
import publicAxios from '../../axios.config/piublicAxios'
import { Button } from 'antd'

import './newFilm.scss'
import { useNavigate, useParams } from 'react-router-dom'
export default function NewFilm() {
  const user= JSON.parse(localStorage.getItem("currentUser"))||{}

  const [newFlim,setNewFilm]=useState()
  const [flag,setFlag]=useState(0)
  const nav=useNavigate()
  const getNewFilm=async()=>{
    const db=await publicAxios.get("/api/v1/films/newfilm")
    setNewFilm(db.data.data)
  }
  useEffect(()=>{
    getNewFilm()
  },[flag])
  const playFilm= async(id)=>{
    if (!user.userId) {
      alert("Vui Lòng Đăng Nhập Để xem phim")
      return
    }
    if (newFlim.filmVip == 1 && user.userVip != 2) {
      alert("Vui Lý Đăng Kích Hoạt Vip 2 Để Xem Phim");
      return;
    }
    try {
      await publicAxios.post(`/api/v1/history`,{flimId:id,userId:user.userId})

    } catch (error) {
      console.log(error);
    }
   nav(`/film/${id}`)
  }
  return (
    
    <div className='newFilm' >
      
      <img className='newFilm_poster' style={{width:"100vw",height:900}} src={newFlim?.poster} alt="" />
      <div className='newFilm_content'>
      <h1 style={{fontSize:50}}>{newFlim?.filmName}</h1>
      <p>{newFlim?.describe}</p>
      <Button className='newFilm_btn' onClick={()=>playFilm(newFlim.filmId)}><i class="fa-solid fa-play"></i> &nbsp; &nbsp; Phát</Button>
      </div>
    </div>
  )
}
