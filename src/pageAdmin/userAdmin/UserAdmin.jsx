import React, { useEffect, useState,useRef } from 'react'
import HeaderAdmin from '../../components/adminHeader/HeaderAdmin'
import Fotter from '../../components/fotter/Fotter'
import privateAxios from '../../axios.config/privateAxios'
import { Button, Divider, Popconfirm, Table, Tag } from 'antd';



export default function UserAdmin() {
    const [listUser, setListUser] = useState([])
    const [flag,setFlag]=useState(0)

   async function getAllUsers() {
        const db= await privateAxios.get("/api/v1/users")
        setListUser(db.data.data)
    }
    useEffect(()=>{
        getAllUsers()
    },[flag])
    console.log(listUser);

    const columns = [
        {
          title: 'Tên Người dùng',
          width: 300,
          dataIndex: 'userName',
          key: 'userName',
          fixed: 'left',
        },
        {
          title: 'Email',
          width: 300,
          dataIndex: 'email',
          key: 'email',
          fixed: 'left',
        },
        {
          title: 'Trạng Thái',
          dataIndex: 'status',
          key: 'status',
          width: 100,
        },
        {
          title: 'Vip',
          dataIndex: 'userVip',
          key: 'userVip',
          width: 150,
        },
        {
          title: '',
          dataIndex: 'address',
          key: '3',
          width: 150,
        },
       
       {
      title: "Action",
      dataIndex: "userId",
      width: 250,
      render: (_,user) => (
        <Popconfirm
        title={user.status=="active"?"Ban user nay ?":"unband user nay ?"}
     
          onConfirm={() =>handleBan(user.userId)}
          okText="Yes"
          cancelText="No"
        >
       
            {user.status=="active"?   <Button style={{backgroundColor:"red"}}>BAN</Button>:   <Button style={{backgroundColor:"yellow"}}>UNBAN</Button>}
       
        </Popconfirm>
      ),
    },
      ];
      
  const handleBan = async (userId) => {
      try {
    const result = await privateAxios.put(`/api/v1/users/${userId}`)
    setFlag(flag+1)
        
      } catch (error) {
        console.log(error);
      }
  }
  

 
  return (
    <div>
        <HeaderAdmin></HeaderAdmin>
        <h3 style={{textAlign:"center",fontSize:"30px",marginTop:"20px"}}>Danh sách người dùng</h3>
        <Table pagination={{pageSize:10}}
    style={{ marginTop: 20 }}
    columns={columns}
    dataSource={listUser}
    scroll={{
      x: 1500,
      y: 1000,
    }}
  />

        <Fotter></Fotter>
    </div>
  )
}
