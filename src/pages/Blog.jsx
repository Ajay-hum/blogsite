import React, { useState, useEffect } from 'react'
import {
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import Badge from "../components/Badge"
import { toast } from 'react-toastify';

const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]); 
  const {id} = useParams();

  useEffect(() => {
    if(id) {
      getSingleBlog();
    }
  }, [id]);

  const getSingleBlog = async () => {
    const response = await axios.get(`http://localhost:3000/blogs/${id}`);
    const relatedPostData = await axios.get(`http://localhost:3000/blogs?category=${response.data.category}&_start=0&_end=3`);

    if(response.status === 200 || relatedPostData.status === 200) {
      setBlog(response.data);
      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const excerpt = (str) => {
    if(str.length > 60) {
      str = str.substring(0, 60) + " ... "
    }
    return str;
  };

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px"
  }

  return (
    <MDBContainer style={{border: "1px solid #E0E0E0"}}>
      <Link to="/">
        <strong style={{float: "left", color: "black"}} className='mt-3'>
          Back
        </strong>
      </Link>
      <img
        src={blog && blog.imageUrl}
        className='img-fluid rounded'
        alt={blog && blog.imageUrl}
        style={{width: "70rem", maxHeight: "450px", marginTop: "50px"}}
      />
      <MDBTypography 
        tag="h2" 
        className='text-muted mt-2' 
        style={{display: "inline-block", color: 'Black'}}
      >
        {blog && blog.title}
      </MDBTypography>
      <div style={{marginTop: "20px", color: 'Black'}}>
        <div style={{height: "43px", background: "#f6f6f6"}}>
          <strong
            style={{float: "left", marginTop: "12px"}}
          >
            Blog Updated on: 
          </strong>
          <strong style={{float: "left", marginTop: "12px", marginLeft: "2px"}}>
            {blog && blog.date}
          </strong>
          <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
        </div>
        <MDBTypography className='lead md-0'>
          {blog && blog.description}
        </MDBTypography>
      </div>
      {relatedPost && relatedPost.length > 0 && (
        <>
          {relatedPost.length > 1 && (
            <h6 style={{marginTop: "50px"}}>Related Posts</h6>
          )}
          <MDBRow className='"row-cols-1 row-cols-md-3 g-4'>
            {relatedPost.filter((item) => item.id !== id).map((item, index) => (
              <MDBCol>
                <MDBCard>
                  <Link to={`/blog/${item.id}`}>
                    <MDBCardImage
                      src={item.imageUrl}
                      alt={item.title}
                      position="top"
                      style={{width: "15rem", maxHeight: "45rem", marginTop: "50px"}}
                    />
                  </Link>
                  <MDBCardBody>
                    <MDBCardTitle style={{ color: 'Black'}}>{item.title}</MDBCardTitle>
                    <MDBCardText style={{ color: 'Black'}}>{excerpt(item.description)}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </>
      )}
    </MDBContainer>
  )
}

export default Blog