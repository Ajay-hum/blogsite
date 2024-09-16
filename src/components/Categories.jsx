import React from 'react';
import { MDBListGroupItem } from 'mdb-react-ui-kit';

const Categories = ({ handleCategory, options, selectedCategory }) => {
  const allOption = "All"; // Define the "All" option

  // Include "All" in the list of categories
  const categoriesWithAll = [allOption, ...options];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
      {categoriesWithAll.map((item, index) => (
        <MDBListGroupItem
          key={index}
          style={{
            cursor: "pointer",
            textDecoration: selectedCategory === item ? 'underline' : 'none',
            color: selectedCategory === item ? 'orange' : 'black',
            flex: 1, // Allow items to grow equally
            textAlign: 'center' // Center the text
          }}
          onClick={() => handleCategory(item === allOption ? "" : item)} // Pass empty string for "All"
        >
          {item}
        </MDBListGroupItem>
      ))}
    </div>
  );
};

export default Categories;


