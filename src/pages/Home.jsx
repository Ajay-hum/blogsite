import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import Categories from '../components/Categories'; // Import the Categories component
import LatestBlog from '../components/LatestBlog';

const Home = () => {
  const [data, setData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const categories = [ 'Travel', 'Fashion', 'Technology', 'Food', 'Music' ]; // Example categories

  useEffect(() => {
    loadBlogsData();
    fetchLatestBlog();
  }, [selectedCategory]); // Reload data when category changes

  const loadBlogsData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/blogs");
      if (response.status === 200) {
        const filteredData = selectedCategory
          ? response.data.filter(blog => blog.category === selectedCategory) // Filter based on selected category
          : response.data;

        setData(filteredData);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const fetchLatestBlog = async () => {
    const totalBlog = await axios.get("http://localhost:3000/blogs");
    const start = totalBlog.data.length - 4
    const end = totalBlog.data.length
    const response = await axios.get(`http://localhost:3000/blogs?_start=${start}&_end=${end}`)
    if (response.status === 200) {
      setLatestBlog(response.data);
    } else {
      toast.error("Something went wrong")
    }
  }

  const handleCategory = (category) => {
    setSelectedCategory(category); // Update the selected category
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const response = await axios.delete(`http://localhost:3000/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog Deleted Successfully");
        loadBlogsData();
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const excerpt = (str) => {
    return str.length > 50 ? str.substring(0, 50) + " ... " : str;
  };

  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogsData();
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:3000/blogs?q=${searchValue}`);
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const scrollToBlogs = () => {
    document.getElementById('blogs-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Landing Section */}
      <MDBContainer style={{ backgroundColor: 'black', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }} className="text-center my-5">
        <MDBTypography tag='h1' style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome to Our Blog</MDBTypography>
        <MDBTypography tag='h5' style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Discover amazing articles and insights</MDBTypography>
        <MDBBtn style={{ color: "black", background: "orange" }} onClick={scrollToBlogs}>Explore</MDBBtn>
      </MDBContainer>

      <Search 
        searchValue={searchValue} 
        onInputChange={onInputChange} 
        handleSearch={handleSearch}
      />

      {/* Categories Section */}
      <Categories 
        options={categories} 
        handleCategory={handleCategory} 
        selectedCategory={selectedCategory} 
      />
      
      {/* Blogs Section */}
      <MDBRow id="blogs-section">
        {data.length === 0 && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            No Blog was Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data && data.map((item, index) => (
                <Blogs
                  key={index}
                  {...item}
                  excerpt={excerpt}
                  handleDelete={handleDelete} />
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
          <h4 className='text-start'>Latest Posts</h4>
          {latestBlog && latestBlog.map((item, index) => (
            <LatestBlog key={index} {...item}/>
          ))}
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Home;
