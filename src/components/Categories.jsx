import React from 'react';
import { MDBListGroupItem } from 'mdb-react-ui-kit';

const Categories = ({ handleCategory, options, selectedCategory }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
      {options.map((item, index) => (
        <MDBListGroupItem
          key={index}
          style={{
            cursor: "pointer",
            textDecoration: selectedCategory === item ? 'underline' : 'none',
            color: selectedCategory === item ? 'orange' : 'black',
            flex: 1, // Allow items to grow equally
            textAlign: 'center' // Center the text
          }}
          onClick={() => handleCategory(item)}
        >
          {item}
        </MDBListGroupItem>
      ))}
    </div>
  );
};

export default Categories;

