import React, { useEffect, useState } from 'react'
import publicAxios from '../axios.config/piublicAxios'
import {useParams} from 'react-router-dom'
import privateAxios from '../axios.config/privateAxios'
export default function PlayFlim() {
    const [film,setFilm]=useState()
    const [flag,setFlag]=useState(0)
    const {id}=useParams()

    const getFilmById=async()=>{
      try {
        const db=await publicAxios.get(`/api/v1/films/${id}`)
        setFilm(db.data.data)
      } catch (error) {
        console.log(error);
      }
        
      }
      useEffect(()=>{
        getFilmById()
      },[flag])
      const setValueFlim=(e)=>{
        console.log(e.target.currentTime);
      }
      
  return (
    <div>
        <video width={"100%"} height={"100%"} src={film?.url}controls autoPlay="autoplay"  onPause={setValueFlim} currentTime={47.07456}   ></video>
    </div>
  )
}
