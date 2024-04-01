import React, { useEffect, useState } from "react";
import privateAxios from "../../axios.config/privateAxios";
import { Button, Pagination } from "antd";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/filebase";


export default function RenderFilm() {
  const [listFilm, setListFilm] = useState([]);
  const [listFilmOnly, setListFilmOnly] = useState([]);
  const [flag, setFlag] = useState(0);
  const [filmEdit, setFilmEdit] = useState({});
  const [previewPoster, setPreviewPoster] = useState(null);
  const [previewTrailer, setPreviewTrailer] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewFilmEdit, setPreviewFilmEdit] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedMediaFilmEdit, setSelectedMediaFilmEdit] = useState(null);
  const [checkPoster, setCheckPoster] = useState(null);
  async function getAllFilm() {
    const db = await privateAxios.get("/api/v1/films");

    setListFilm(db.data.data);
    setListFilmOnly(db.data.data1);
  }

  useEffect(() => {
    getAllFilm();
  }, [flag]);
  const setVip = (filmId) => {
    const check = confirm("Bạn có muốn đổi VIP");
    if (!check) {
      return;
    }
    try {
      const db = privateAxios.put(`/api/v1/films/vip/${filmId}`);
      setFlag(flag + 1);
      alert(db.data.message);
    } catch (error) {}
  };
  // modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setFilmEdit(item);
  };

  const handleAddMedia = (event) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreviewPoster(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = async () => {
    const check = confirm("bạn có muốn chọn poster này");
    if (!check) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedMedia);
    formData.append("upload_preset", "prj_md3");
    const [uploadMedia] = await Promise.all([
      axios.post(
        "https://api.cloudinary.com/v1_1/dwi7pnunq/image/upload",
        formData
      ),
    ]);
    setCheckPoster(uploadMedia.data.secure_url);
    setFilmEdit({ ...filmEdit, poster: uploadMedia.data.secure_url });
  };

  const handleAddVideo = (event) => {
    let file = event.target.files[0];
    const imageRef = ref(storage, `trailler/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
       setPreviewTrailer(url);
        setFilmEdit({ ...filmEdit, trailer: url });
      });
    });
  };

  const changeFilm = (event) => {
    setSelectedMediaFilmEdit(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreviewFilmEdit(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const addFilm = async () => {
    const check = confirm("bạn có muốn chọn film này");
    if (!check) {
      return;
    }
    const imageRef = ref(storage, `films/${selectedMediaFilmEdit.name}`);
    uploadBytes(imageRef, selectedMediaFilmEdit).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setPreviewUrl(url);
        setFilmEdit({ ...filmEdit, url: url });
      });
    });
  };
  const editFilm = async () => {
    const check = confirm("bạn có muốn sửa film này");
    if (!check) {
      return;
    }
    try {
    const db =await privateAxios.put(`/api/v1/films/update/${filmEdit.filmId}`, filmEdit)
      alert(db.data);
      setFlag(flag + 1);
      setShow(false);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (filmId) => {
    const check=confirm("bạn có muốn xóa phim")
    if (!check) {
      return;
    }
    try {
      const db = await privateAxios.delete(`/api/v1/films/${filmId}`);
      setFlag(flag + 1);
      alert(db.data);
    } catch (error) {
      console.log(error);
      
    }
  }
  console.log(filmEdit);
  return (
    <div>
      <table style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <th style={{ width: 300 }}>Tên Phim</th>
          <th>Poster</th>
          <th>Trailler</th>
          <th>Phim</th>
          {/* <th style={{width:300}}>Mô Tả</th> */}
          <th style={{ width: 50 }}>Thể Loại</th>
          <th style={{ width: 150 }}>Vip</th>
          <th>Lượt Xem</th>
          <th style={{ width: 150 }}>Ngày Thêm</th>
          <th>Action</th>
        </thead>
        {listFilmOnly.map((item, index) => {
          return (
            <tbody
              key={index}
              style={{
                textAlign: "center",
                height: 200,
                borderBottom: "1px solid brown",
              }}
            >
              <td style={{ fontWeight: 600, color: "tomato" }}>
                {item.filmName}
              </td>
              <td>
                <img src={item.poster} style={{ width: "240px" }} />
              </td>
              <td>
                <video
                  src={item.trailer}
                  controls="controls"
                  width={240}
                ></video>
              </td>
              <td>
                <video src={item.url} controls="controls" width={240}></video>
              </td>
              {/* <td>{item.describe}</td> */}
              <td>
                <span>
                  {listFilm.map((e) => {
                    if (e.filmId == item.filmId) {
                      return e.categoryName;
                    }
                  })}
                  ,
                </span>
              </td>
              <td style={{ fontWeight: 600, color: "tomato" }}>
                <Button
                  onClick={() => setVip(item.filmId)}
                  style={{
                    backgroundColor: `${item.filmVip ? "orange" : "green"}`,
                  }}
                >
                  {item.filmVip}
                </Button>
              </td>
              <td>{item.view}</td>
              <td>{item.date}</td>
              <td>
                {" "}
                <Button
                  onClick={() => handleShow(item)}
                  style={{ backgroundColor: "yellow" }}
                >
                  Sửa
                </Button>{" "}
                <Button onClick={() => handleDelete(item.filmId)} style={{ backgroundColor: "black", color: "white" }}>
                  Xóa
                </Button>
              </td>
            </tbody>
          );
        })}
      </table>
      <Pagination
        defaultCurrent={1}
        defaultPageSize={2}
        style={{ textAlign: "center", margin: 20 }}
        total={listFilmOnly.length}
      />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Chỉnh Sửa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Button style={{ backgroundColor: "yellow" }}>Chọn Thể Loại</Button>{" "} */}
          <div
            style={{
              display: "flex",
              // visibility: `${currentCategory.length ? "visible" : "hidden"}`,
            }}
          ></div>
          <Form.Label>Tên Flim:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tên Film"
            value={filmEdit.filmName}
            onChange={(e) =>
              setFilmEdit({ ...filmEdit, filmName: e.target.value })
            }
          />
          <Form.Label>Poster:</Form.Label>
          <Form.Control type="file"  onChange={handleAddMedia}  />
          <br />
          <img width={200} style={{visibility:`${previewPoster ? "visible" : "hidden"}`}}
           src={previewPoster} alt="Image" />
          <br />
          <Button style={{backgroundColor:"yellow",visibility:`${previewPoster ? "visible" : "hidden"}`}}  onClick={handleAdd}>Chọn Poster</Button>
          <i
            style={{
              color: "orange",
              marginLeft: 10,
              visibility:`${checkPoster? "visible" : "hidden"}`,
              fontSize: 25,
            }}
            class="fa-solid fa-circle-check"
          ></i>
          <br />
         <Form.Label>Trailler:</Form.Label>
          <Form.Control type="file" onChange={handleAddVideo} />
          <br />
          <video width={320} height={240} src={previewTrailer} controls></video>
          <br />
          <Form.Label>Phim Chính:</Form.Label>
          <Form.Control type="file" onChange={changeFilm} />
          <video width={320} height={240} src={previewFilmEdit} controls></video>
          <br />
          <Button  style={{backgroundColor:"yellow",visibility:`${previewFilmEdit? "visible" : "hidden"}`,}} onClick={addFilm}>CHọn Phim</Button>
          <i
            style={{
              color: "orange",
              marginLeft: 10,
              visibility:`${previewUrl? "visible" : "hidden"}`,
              fontSize: 25,
            }}
            class="fa-solid fa-circle-check"
          ></i>
          <br />
          <Form.Label>Mô tả</Form.Label>
          <Form.Control as="textarea"  onChange={(e) =>
                setFilmEdit({ ...filmEdit, describe: e.target.value })
              } value={filmEdit.describe} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{backgroundColor:"yellow"}} onClick={editFilm}>Edit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
