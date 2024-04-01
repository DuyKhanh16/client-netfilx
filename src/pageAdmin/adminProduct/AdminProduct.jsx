import React, { useEffect, useState } from "react";
import "./AdminProduct.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/filebase";
import privateAxios from "../../axios.config/privateAxios";
import RenderFilm from "../renderFlim/RenderFilm";

export default function AdminProduct() {
  const [video, setVideo] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [urlFilm, setUrlFilm] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewFilm, setPreviewFilm] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedMediaFilm, setSelectedMediaFilm] = useState(null);
  const [smShow, setSmShow] = useState(false);

  const [listCategory, setListCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [flag, setFlag] = useState(0);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
  });

  const [newFilm, setNewFilm] = useState({
    filmName: "",
    poster: "",
    trailer: "",
    url: "",
    describe: "",
  });

  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    const check = confirm("bạn có muốn thoát chỉnh sửa");
    if (check) {
      setShow(false);
      window.location.reload();
    }
  };
  const handleShow = () => setShow(true);

  // Poster
  const handleAddMedia = (event) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview(event.target.result);
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
    setUrlImage(uploadMedia.data.secure_url);
    setNewFilm({ ...newFilm, poster: uploadMedia.data.secure_url });
  };
  //   Trailler
  const handleAddVideo = (event) => {
    let file = event.target.files[0];
    const imageRef = ref(storage, `trailler/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setVideo(url);
        setNewFilm({ ...newFilm, trailer: url });
      });
    });
  };

  //   Film
  const changeFilm = (event) => {
    setSelectedMediaFilm(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreviewFilm(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const addFilm = async () => {
    const check = confirm("bạn có muốn chọn film này");
    if (!check) {
      return;
    }
    const imageRef = ref(storage, `films/${selectedMediaFilm.name}`);
    uploadBytes(imageRef, selectedMediaFilm).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrlFilm(url);
        setNewFilm({ ...newFilm, url: url });
      });
    });
  };

  const getAllCategory = async () => {
    try {
      const result = await privateAxios.get("/api/v1/category");
      setListCategory(result.data.data);
    } catch (error) {
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, [flag]);

  const changeCategory = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      setCurrentCategory([...currentCategory, e.target.value]);
    } else {
      setCurrentCategory(
        currentCategory.filter((item) => item !== e.target.value)
      );
    }
  };
  const addCategory = async () => {
    if (newCategory.categoryName === "") {
      alert("vui lý nhap ten category");
      return;
    }
    try {
      const result = await privateAxios.post("/api/v1/category", [
        newCategory.categoryName,
      ]);
      alert(result.data);
      setFlag(flag + 1);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(newFilm);
  const uploadFilm = async () => {
    if (newFilm.filmName==""||newFilm.poster==""||newFilm.trailer==""||newFilm.url==""||newFilm.describe=="") {
      alert("vui lý nhap day du thong tin")
      return
      
    }
    if (currentCategory.length === 0) {
      alert("vui lý chọn category")
      return
      
    }
    const categoryAdd = listCategory.reduce(
      (prev, current, index) => {
        const data = currentCategory?.find((item) => {
          return item === current.categoryName;
        })
        if(data) {
          return [...prev, current]
        }
        return prev
      },

      []
    );

    const check = confirm("bạn có muốn chọn film không");
    if (!check) {
      return;
    }
    
    const fileUpdoad = {
      film: newFilm,
      category: categoryAdd
    }
    try {
      const result= await privateAxios.post("/api/v1/film",fileUpdoad)
     alert(result.data.message)
     window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button style={{ margin: 50 }} variant="warning" onClick={handleShow}>
        THÊM PHIM MỚI
      </Button>
      <RenderFilm></RenderFilm>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Thêm Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Button onClick={() => setSmShow(true)} variant="warning">
              Chọn Thể Loại
            </Button>{" "}
            <br />
            <div
              style={{
                display: "flex",
                visibility: `${currentCategory.length ? "visible" : "hidden"}`,
              }}
            >
              <p>Phân loại</p>
              {currentCategory.map((e, i) => (
                <p style={{ marginLeft: 10, color: "red" }} key={i}>
                  {e}
                </p>
              ))}
            </div>
            <Form.Label>Tên Flim:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên Film"
              onChange={(e) =>
                setNewFilm({ ...newFilm, filmName: e.target.value })
              }
            />
            <Form.Label>Poster:</Form.Label>
            <Form.Control onChange={handleAddMedia} type="file" />
            <br />
            <img
              style={{ display: `${preview ? "inline" : "none"}` }}
              width={200}
              src={preview}
              alt="Image"
            />
            <br />
            <Button
              style={{ display: `${preview ? "block" : "none"}` }}
              onClick={handleAdd}
            >
              Chọn Poster
            </Button>
            <i
              style={{
                color: "orange",
                marginLeft: 10,
                display: `${urlImage ? "inline" : "none"}`,
                fontSize: 25,
              }}
              class="fa-solid fa-circle-check"
            ></i>
            <Form.Control onChange={handleAddVideo} type="file" />
            <br />
            <video
              style={{ display: `${video ? "block" : "none"}` }}
              width={320}
              height={240}
              src={video}
              controls
            ></video>
            <br />
            <Form.Label>Phim Chính:</Form.Label>
            <Form.Control onChange={changeFilm} type="file" />
            <video
              style={{ display: `${previewFilm ? "block" : "none"}` }}
              width={320}
              height={240}
              src={previewFilm}
              controls
            ></video>
            {urlFilm ? <p>{urlFilm}</p> : null}
            <Button
              style={{ display: `${previewFilm ? "block" : "none"}` }}
              onClick={addFilm}
            >
              CHọn Phim
            </Button>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) =>
                setNewFilm({ ...newFilm, describe: e.target.value })
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={uploadFilm}>
            Tải Phim Lên
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        style={{ paddingTop: 100, backgroundColor: "rgba(0,0,0,0.5)" }}
        size="m"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Thể Loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <from
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr ",
              gap: "5px",
            }}
            onChange={changeCategory}
          >
            {listCategory?.map((e, i) => {
              return (
                <div key={i} style={{ marginLeft: 20 }}>
                  <input type="checkbox" value={e.categoryName} />
                  <label> {e.categoryName}</label>
                </div>
              );
            })}
          </from>
          <Form.Label style={{ marginTop: 20, color: "red" }}>
            Thêm Phân Loại:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="thêm phân loại"
            onChange={(e) =>
              setNewCategory({ ...newCategory, categoryName: e.target.value })
            }
          />
          <Button style={{ marginTop: 20 }} onClick={addCategory}>
            Thêm Mới Phân Loại
          </Button>
        </Modal.Body>
      </Modal>
      <div></div>
    </div>
  );
}
