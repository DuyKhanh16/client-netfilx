import React from 'react'
import "./fotter.scss"
export default function Fotter() {
  return (
    <div className='fotter'>
        <div className='fotter_icon'>
        <i style={{color:"white",fontSize:25, margin:15}} class="fa-brands fa-facebook-f"></i>
        <i style={{color:"white",fontSize:25 , margin:15}} class="fa-brands fa-instagram"></i>
        <i style={{color:"white",fontSize:25, margin:15}} class="fa-brands fa-twitter"></i>
        <i style={{color:"white",fontSize:25, margin:15}} class="fa-brands fa-youtube"></i>
        </div >
        <div className="fotter_link">
        <div className="fotter_text1">
            <p>Mô tả âm thanh</p>
            <p>Liên hệ nhà đầu tư</p>
            <p>Thông báo pháp lý</p>
        </div>
        <div className="fotter_text1">
            <p>Trung tâm trợ giúp</p>
            <p>Việc làm</p>
            <p>Thùy chọn cookie</p>
        </div>
        <div className="fotter_text1"><p>Quà tặng</p>
        <p>ĐIều khoản sử dụng</p>
        <p>Trung tâm đa phương tiện</p></div>
        <div className="fotter_text1">
            <p>Thông tin Doanh nghiệp</p>
            <p>Quyền Riêng tư</p>
            <p>Liện hệ với chúng tôi</p>
        </div>
        </div>
    </div>
  )
}
