import React from 'react';
import { MDBContainer, MDBTypography, MDBCard, MDBCardImage } from 'mdb-react-ui-kit';
import aboutImage from '../assets/about-image.jpg'; // Adjust the path as necessary

const About = () => {
  return (
    <MDBContainer style={{ marginTop: "50px" }}>
      <MDBTypography style={{ padding: "20px" }}>
        <h2 style={{ fontWeight: "900", color: "Black" }}>ABOUT US</h2>
        <p style={{ marginTop: '20px', color: 'Black' }}>
          ChatterBox is your go-to platform for expressing thoughts and feelings through the art of blogging. 
          Our mission is to provide a safe space where you can share your stories, insights, and experiences 
          with the world. We believe that everyone has a unique voice and perspective that deserves to be heard. 

          Whether it’s a personal journey filled with triumphs and challenges, a creative piece that showcases 
          your imagination, or a topic you’re passionate about that sparks conversation, we encourage you to 
          let your voice be heard. Our community thrives on diversity and inclusivity, welcoming writers and 
          readers from all walks of life.

          At ChatterBox, we understand the power of words. They can inspire, educate, and connect people 
          across distances and cultures. That’s why we offer a variety of tools and resources to help you 
          craft your message effectively. From writing tips and prompts to community feedback and support, 
          we are here to nurture your creativity and help you grow as a writer.

          Join our vibrant community of writers and readers, where you can engage in meaningful discussions, 
          share your insights, and explore a wide range of topics. Whether you’re a seasoned blogger or just 
          starting out, ChatterBox is the perfect place to express yourself and connect with others who share 
          your passions.

          Together, let’s create a tapestry of voices that reflect the richness of human experience. Discover 
          the transformative power of storytelling with ChatterBox, and embark on a journey of self-expression 
          and connection that transcends boundaries. Your story matters, and we can’t wait to hear it!
        </p>
      </MDBTypography>
      <MDBCard style={{ marginTop: "20px", alignItems: "center" }}>
        <MDBCardImage
          src={aboutImage}
          alt='About ChatterBox'
          position='top'
          style={{ width: "50rem", height: "20rem" }}
          className='img-fluid'
        />
      </MDBCard>
    </MDBContainer>
  );
}

export default About;

