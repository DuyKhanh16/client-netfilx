import React from 'react'
import Header from '../components/header/Header'
import Fotter from '../components/fotter/Fotter'
import HomeBody from '../components/homeBody/HomeBody'
import NewFilm from '../components/homeSlider/NewFilm'

export default function Home() {
  return (
    <div>
        <Header></Header>
        <NewFilm></NewFilm>
        <HomeBody></HomeBody>
        <Fotter></Fotter>
    </div>
  )
}
