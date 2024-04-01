import React from 'react'
import HeaderAdmin from '../components/adminHeader/HeaderAdmin'
import Fotter from '../components/fotter/Fotter'
import AdminProduct from './adminProduct/AdminProduct'

export default function Admin() {
  return (
    <div>
        <HeaderAdmin></HeaderAdmin>
        <AdminProduct></AdminProduct>
        <Fotter></Fotter>
    </div>
  )
}
