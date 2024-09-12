import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit'

const Navbar = () => {
    const [show, setShow] = useState(false);

    // State for dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Categories for dropdown
    const categories = [
      { path: "/blog/technology", link: "Technology" },
      { path: "/blog/travel", link: "Travel" },
      { path: "/blog/fashion", link: "Fashion" },
      { path: "/blog/food", link: "Food" },
      { path: "/blog/music", link: "Music" },
    ];

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

  return (
    <div>
      <MDBNavbar expand='lg' light style={{backgroundColor: "black"}}>
        {/* Container wrapper */}
        <MDBContainer fluidclassName="d-flex justify-content-between p-3">
        <MDBNavbarBrand href='/' className='text-xl font-bold text-warning fw-bold '>Chatter<span className='text-danger px-0'>Box</span></MDBNavbarBrand>
          {/* Toggle button */}
          <MDBNavbarToggler
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarRightAlignExample"
            aria-controls="navbarRightAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={()=> setShow(!show)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          {/* Collapsible wrapper */}
          <MDBCollapse show={show} navbar>
            {/* Left links */}
            <MDBNavbarNav className='mb-2 mb-lg-0'>
              <MDBNavbarItem className="active">
                <MDBNavbarLink className="fw-bold text-light" aria-current="page" href="/" style={{color: 'white'}}>Home</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="fw-bold text-light" href="/blog/:id" style={{color: 'white'}}>Blogs</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="fw-bold text-light" href="/addBlog" style={{color: 'white'}}>Add Blog</MDBNavbarLink>
              </MDBNavbarItem>
              
              {/* Navbar dropdown */}
              <MDBNavbarItem className="focus:outline-none dropdown">
                <MDBNavbarLink
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    toggleDropdown(); // Toggle dropdown
                  }}
                  data-mdb-dropdown-init
                  className="dropdown-toggle fw-bold text-light"
                  href="/categories"
                  id="navbarDropdown"
                  role="button"
                  //data-mdb-toggle="dropdown"
                  aria-expanded={isDropdownOpen}
                  style={{color: 'white'}}
                >
                  Categories
                </MDBNavbarLink>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <ul className='position-absolute start-0 mt-2 w-48 rounded shadow bg-dark'>
                    {categories.map(({ path, link }) => (
                      <MDBNavbarLink key={path}>
                        <NavLink to={path} className="dropdown-item text-white hover:bg-secondary">
                          {link}
                        </NavLink>
                      </MDBNavbarLink>
                    ))}
                  </ul>
                )}
                {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <MDBNavbarLink className="dropdown-item" href="/categories/travel">Travel</MDBNavbarLink>
                  </li>
                  <li>
                    <MDBNavbarLink className="dropdown-item" href="/categories/fashion">Fashion</MDBNavbarLink>
                  </li>
                  <li>
                    <MDBNavbarLink className="dropdown-item" href="/categories/technology">Technology</MDBNavbarLink>
                  </li>
                  {/*<li><hr className="dropdown-divider" /></li>
                  <li>
                    <MDBNavbarLink className="dropdown-item" href="/categories/music">Music</MDBNavbarLink>
                  </li>
                </ul> */}
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="fw-bold text-light" href="/about" style={{color: 'white'}}>About</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="fw-bold text-light" href="/contact" style={{color: 'white'}}>Contact</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            {/* Left links */}
          </MDBCollapse>
          {/* Collapsible wrapper */}
        </MDBContainer>
        {/* Container wrapper */}
      </MDBNavbar>
    </div>
  );
};

export default Navbar;