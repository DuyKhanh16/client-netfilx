import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import Fotter from '../fotter/Fotter'
import { useNavigate, useParams } from 'react-router-dom'
import publicAxios from '../../axios.config/piublicAxios'
import Button from 'react-bootstrap/esm/Button'
export default function FlimDetail() {
  const user= JSON.parse(localStorage.getItem("currentUser"))||{}

    const nav=useNavigate()
    const {id}=useParams()
    const [flag,setFlag]=useState(0)
    const [film,setFilm]=useState([])
    const [flimCategory,setFilmCategory]=useState([])
    const [allRating,setAllRating]=useState([])
    const [category,setCategory]=useState([])
    const [newComent,setNewComent]=useState({})
    const [playPoster,setPlayPoster]=useState(false)

    const getFilmById=async()=>{
        const db=await publicAxios.get(`/api/v1/films/${id}`)
        setFilm(db.data.data)
    }
    const getCategoryByFlim=async()=>{
        const db=await publicAxios.get(`/api/v1/category/${id}`)
        setCategory(db.data.data)
    }
    const getAllFilm=async()=>{

        const db=await publicAxios.get("/api/v1/films/public")
        setFilmCategory(db.data.data)
    }
    const getAllRating=async()=>{

        const db=await publicAxios.get(`/api/v1/rating/${id}`)
        setAllRating(db.data.data)
    }
    
    useEffect(()=>{
       
        getFilmById()
        getAllFilm()
        getAllRating()
        getCategoryByFlim()

      
        
    },[flag])
    const arr=[]
    for (let i = 0; i < category.length; i++) {
        for (let j = 0; j < flimCategory.length; j++) {
            if (category[i].categoryId==flimCategory[j].categoryId) {
                arr.findIndex(x=>x.filmId==flimCategory[j].filmId) !=-1?null:arr.push(flimCategory[j])
            }
        }
    }
    const addCommnet=async()=>{
        if (!user.userName) {
            alert("Vui Lý Đăng Nhập Để Bình Luận")
            return
        }
        const check=confirm("Bạn Có Muốn Bình Luận")
        if (!check) {
            return
        }
        try {
        const db=await publicAxios.post(`/api/v1/rating/${user.userId}`,{newComent,id})
            alert(db.data.message)
            setFlag(flag+1)
        } catch (error) {
            console.log(error);
        }
    }
    const playFilm= async()=>{
        if (!user.userId) {
          alert("Vui Lòng Đăng Nhập Để xem phim")
          return
        }
        if (film.filmVip == 1 && user.userVip != 2) {
          alert("Vui Lý Đăng Kích Hoạt Vip 2 Để Xem Phim");
          return;
        }
        try {
      await publicAxios.post(`/api/v1/history`,{flimId:film.filmId,userId:user.userId})
            
        } catch (error) {
            
        }
       nav(`/film/${id}`)
      }
  return (
    <div style={{color:"white",height:"100vh"}}>
        <Header></Header>
        <div style={{width:"100vw", backgroundColor:"#424040"}}>
            <div style={{width:"80%",height:"100%", backgroundColor:"black",margin:"0 auto",paddingTop:70}}>
                <h1 style={{ color:"white",margin:20,opacity:0.8,fontSize:50}}>{film.filmName} <span style={{color:"yellow",display:`${film.filmVip?"inline":"none"}`}}><i class="fa-solid fa-star"></i></span></h1>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    {playPoster?<video src={film.trailer} style={{width:640}} controls/>:<img width={600} src={film.poster} alt="" />
}
                <div style={{display:"flex",flexDirection:"column",padding:20}} >
                    <Button style={{width:200,margin:20,backgroundColor:`${playPoster?"red":"green"}`}} s
                     onClick={()=>setPlayPoster(!playPoster)}>{playPoster?"Đóng Trailler":"Xem Trailer"}</Button>
                    <Button style={{width:200, margin:20}} onClick={playFilm}>Xem Phim</Button>
                    <p style={{ color:"white",opacity:0.8}}>Mô Tả :</p>
                    <p style={{ color:"white",opacity:0.8}}> {film.describe}</p>
                </div>
                </div>
                <div style={{margin:20}} >
                    <h4 style={{color:"white"}}>Gợi Ý Phim</h4>
                   <div style={{display:"flex",flexWrap:"wrap"}}>
                   {arr?.map((item)=>{
                       if (item?.filmId!=id) {
                        return  <img width={200} style={{margin:10}} src={item?.poster}/>
                       }
                   })}
                   </div>
                </div>
                <div style={{margin:20}}>
                    <h4>Bình Luận</h4>
                <textarea onChange={(e)=>setNewComent(e.target.value)} style={{width:"100%",height:"100px",backgroundColor:"gray",borderRadius:10}} placeholder='Thêm Bình Luận'></textarea>
                <Button style={{backgroundColor:"#E52213",border:"none",marginTop:20}} onClick={addCommnet}>Thêm Bình Luận</Button>
                </div>
                <div style={{backgroundColor:"gray",padding:20}}>
                    <h5>Danh Sách Bình Luận</h5>
                    {allRating?.map((item)=>{
                        return <p style={{fontSize:20, borderBottom:"1px solid black"}}><span style={{color:"yellow"}}>{item.userName} :</span> &nbsp; {item.comment}</p>
                    })}
                </div>
            </div>
        </div>
        <Fotter></Fotter>
    </div>
  )
}
