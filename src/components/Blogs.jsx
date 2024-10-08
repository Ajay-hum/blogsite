import React from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import Badge from './Badge';

const Blogs = ({title, category, description, id, imageUrl, excerpt, handleDelete}) => {
  return (
    <MDBCol size="3 lg">
      <MDBCard className='h-70 mt-2' style={{maxWidth: "20rem"}}>
        <MDBCardImage
        src={imageUrl}
        alt={title}
        position='top'
        style={{maxwidth: "80%", height: "200px"}}
      />
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>
          {excerpt(description)}
          <Link to={`/blog/${id}`}>Read More</Link>
        </MDBCardText>
        <Badge>{category}</Badge>
        <span>
          <MDBBtn 
            className='mt-1' 
            tag="a" 
            color="none" 
            onClick={() => handleDelete(id)}
          >
            <MDBIcon
              fas
              icon='trash'
              style={{color: "#dd4b39"}}
              size="lg"
            />
          </MDBBtn>
          <Link to={`/editBlog/${id}`}>
            <MDBIcon
              fas
              icon='edit'
              style={{color: "#55acee", marginLeft: "10px"}}
              size="lg"
            />
          </Link>
        </span>
      </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default Blogs;