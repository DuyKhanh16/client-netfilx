import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./homeBody.scss";
import publicAxios from "../../axios.config/piublicAxios";
import { useNavigate, useParams } from "react-router-dom";
export default function HomeBody() {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [listFilm, setListFilm] = useState([]);
  const [listFilmCategory, setListFilmCategory] = useState([]);
  const [flag, setFlag] = useState(0);
  const [show, setShow] = useState();
  const [userHistory,setUserHistory]=useState([])
  const nav = useNavigate();
  const getAllFilm = async () => {
    const db = await publicAxios.get("/api/v1/films/public");
    console.log(db);
    setListFilmCategory(db.data.data);
    setListFilm(db.data.data1);
    setShow(db.data.data1);
  };

  const getUserHistory = async () => {
    const db = await publicAxios.get(`/api/v1/history/${user.userId}`);
    setUserHistory(db.data.data);
  }
  useEffect(() => {
    getAllFilm();
    getUserHistory()
  }, [flag]);

  const blockSearch = () => {
    const search = document.querySelector(".homeBody_search input");
    search.style.display = "block";
  };
  const hiddenSearch = () => {
    const search = document.querySelector(".homeBody_search input");
    search.style.display = "none";
    search.value = "";
    getAllFilm();
  };

  const playFilm =async (film) => {
    if (!user.userId) {
      alert("Vui Lòng Đăng Nhập để xem phim");
      return;
    }
    if (film.filmVip == 1 && user.userVip != 2) {
      alert("Vui Lý Đăng Kích Hoạt Vip 2 Để Xem Phim");
      return;
    }
    try {
      await publicAxios.post(`/api/v1/history`,{flimId:film.filmId,userId:user.userId})
      
    } catch (error) {
      console.log(error);
    }
    nav(`/film/${film.filmId}`);
  };

  const addFilmToHistory = (film) => {
    if (!user.userId) {
      alert("Vui Lòng Đăng Nhập");
      return;
    }
  };
  const handleSearch = (e) => {
    const search = e.target.value;
    const filterFilm = show.filter((item) => {
      return item.filmName.toLowerCase().includes(search.toLowerCase());
    });
    setTimeout(() => {
      setListFilm(filterFilm);
    }, 1000);

    if (search == "") {
      getAllFilm();
    }
  };
  const flimDetail = (id) => {
    nav(`/flimDetail/${id}`);
  };


  const deleteHistory=async(historyId)=>{
    try {
      const result= await publicAxios.delete(`/api/v1/history/${historyId}`)
      alert(result.data)
      setFlag(flag+1)
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="homeBody">
    
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ width: "90%", marginLeft: 20 }} onClick={hiddenSearch}>
          Phim
        </h2>
        <div
          className="homeBody_search"
          style={{ display: "flex", alignItems: "center" }}
        >
          <i
            onClick={blockSearch}
            style={{ fontSize: 27, color: "white", padding: 10 }}
            class="fa-solid fa-magnifying-glass"
          ></i>
          <input
            style={{ display: "none" }}
            onChange={handleSearch}
            type="text"
            placeholder="Tên Phim"
          />
        </div>
        
      </div>
      <div>
          <h2 style={{marginLeft:20,display:`${userHistory?.length==0?"none":"block"}`}}>Danh sách tiếp tục xem của {user.userName}</h2>
          <div style={{display:"flex",flexWrap:"wrap",margin:20}}>
            {userHistory?.map((item,i)=>{
              return (
                <div className="homeBody_history" key={i} style={{margin:20,marginLeft:20,display:"flex",flexDirection:"column"}}>
                  <img onClick={()=>flimDetail(item.filmId)} width={300} height={200} src={item.poster} alt="" />
                  <div className="homeBody_history-bnt" style={{textAlign:"end",position:"absolute"}}>
                  <Button onClick={()=>deleteHistory(item.historyId)} style={{backgroundColor:"red",color:"white",width:50,border:"none"}}
                  ><i class="fa-solid fa-trash"></i></Button>
                </div>  
                </div>
              )
            })}
          </div>
        </div>
        <h2 style={{ marginLeft: 20 }}>Danh sách phim</h2>
      <div className="homeBody_list">
        {listFilm?.map((item, i) => {
          return (
            <div
              key={i}
              className="homeBody_item"
              style={{ cursor: "pointer" }}
              
            >
              <img
                className="homeBody_poster"
                width={300}
                height={200}
                src={item?.poster}
                alt=""
              />
              <video
                className="homeBody_trailer"
                width={300}
                height={200}
                src={item.trailer}
                autoPlay="autoPlay"
              ></video>
              <div className="homeBody_control">
                <Button
                  style={{ backgroundColor: "white", color: "black" }}
                  onClick={() => {
                    playFilm(item);
                  }}
                >
                  <i class="fa-solid fa-play"></i> &nbsp; &nbsp; Phát
                </Button>
                <Button
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    marginLeft: 10,
                  }}
                  onClick={addFilmToHistory}
                >
                  <i class="fa-solid fa-plus"></i>
                </Button>
                <Button   style={{
                    backgroundColor: "white",
                    color: "black",
                    marginLeft: 10,
                  }}
                  onClick={() => flimDetail(item.filmId)}>View</Button>
                <i
                  style={{
                    color: "yellow",
                    marginLeft: 10,
                    display: `${item.filmVip == 1 ? "inline" : "none"}`,
                  }}
                  class="fa-solid fa-star"
                ></i>
                <ul style={{ color: "white", display: "flex" }}>
                  {listFilmCategory?.map((e, i) => {
                    if (item.filmId == e.filmId) {
                      return (
                        <li key={i} style={{ width: 120 }}>
                          {e.categoryName}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
