import React, {useEffect, useState} from 'react'
import {MDBValidation, MDBInput, MDBBtn} from 'mdb-react-ui-kit';
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios';
import {toast} from 'react-toastify'

// ruv8mnt9

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: ""
}

const options = [ 'Travel', 'Fashion', 'Technology', 'Food', 'Music' ];

const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [titleErrMsg, setTitleErrMsg] = useState(null);
  const [descriptionErrMsg, setDescriptionErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const {title, description, category, imageUrl} = formValue;

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if(id) {
      setEditMode(true);
      getSingleBlog (id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`http://localhost:3000/blogs/${id}`);
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog.data });
    } else {
      toast.error("Something went wrong");
    }
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getDate() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  const handleSubmit = async (e) => { //Added async to stop the error on browser
    e.preventDefault();

    if(!title) {
      setTitleErrMsg("Please provide a Title");
    }

    if(!description) {
      setDescriptionErrMsg("please provide a Description");
    }

    if(!category) {
      setCategoryErrMsg("Please select a Category");
    }

    // Proceed if all validations pass
    const imageValidation = !editMode ? imageUrl : true;
    if(title && description && imageUrl && category) {
      const currentDate = getDate();
      if(!editMode) {
        const updatedBlogData = { ...formValue, date: currentDate };
        const response = await axios.post("http://localhost:3000/blogs", updatedBlogData);
        if(response.status === 201) {
          toast.success("Blog created successfully")
        } else {
          toast.error("Something went wrong");
        }        
      } else {
        const response = await axios.put(`http://localhost:3000/blogs/${id}`, formValue);
        if(response.status === 200) {
          toast.success("Blog Updated successfully")
        } else {
          toast.error("Something went wrong");
        } 
      }

      setFormValue(initialState);
      navigate("/");
    }
    //Submit logic added here
  };

  const onInputChange = (e) => {
    setTitleErrMsg(null);
    setDescriptionErrMsg(null);
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = (file) => {
    console.log("file", file); // Files are Logged here
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ruv8mnt9")
    axios
    .post("http://api.cloudinary.com/v1_1/deklejcrt/image/upload", formData)
    .then((resp) => {
      toast.info("Image uploaded successfully!");
      setFormValue({...formValue, imageUrl: resp.data.url});
    })
    .catch((error) => {
      toast.error("Something went wrong");
      console.error(error);
    });
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <MDBValidation className='form-container' 
      style={{marginTop: '70px'}} 
      noValidate 
      onSubmit={handleSubmit}
    >
      <p className='form-title fs-2 fw-bold'>{editMode ? "Update Blog" : "Add Blog"}</p>
      <div>
        <MDBInput
          className="title-field"
          value={title || ""}
          name='title'
          type='text'
          onChange={onInputChange}
          required
          label='Title:'
          validation='Please provide a Title'
          invalid
        />
        {titleErrMsg && (
          <div className="titleErrorMsg">{titleErrMsg}</div>
        )}
        <br/>
        <label>Description:</label>
        <textarea
          className="form-control"
          name='description'
          type='text'
          value={description || ""}
          onChange={onInputChange}
          required
          validation='Please provide a Description'
          rows={3}
          style={{ resize: 'vertical' }} // Enable vertical resizing
        />
        {descriptionErrMsg && (
          <div className="descriptionErrorMsg">{descriptionErrMsg}</div>
        )}
        <br/>
        {!editMode && (
          <>
            <MDBInput
              type='file'
              onChange={(e) => onUploadImage(e.target.files[0])}
              required
              validation='Please upload an Image'
              invalid
            />
            <br/>
          </>
        )}
        <select 
          className='categoryDropdown' 
          onChange={onCategoryChange} 
          value={category}
        >
          <option>Please select a Category</option>
          {options.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        {categoryErrMsg && (
          <div className="categoryErrorMsg">{categoryErrMsg}</div>
        )}
        <br />
        <br />
        <MDBBtn type='submit' style={{marginRight: "10px"}}>
          {editMode ? "Update" : "Add"}
        </MDBBtn>
        <MDBBtn 
          color='danger' 
          style={{marginRight: "10px"}} 
          onClick={() => navigate('/')}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  )
}

export default AddEditBlog