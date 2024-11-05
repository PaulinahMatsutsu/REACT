import React from "react"; // Importing React
import './App.css'; // Importing CSS for styling

// Dashboard component to display the list of products
const Dashboard = ({ products }) => {
  return (
    <div>
      <h2>DASHBOARD</h2> {/* Title of the Dashboard */}
      <h3>PRODUCTS</h3>
      <table border="1"> 
        <thead>
          <tr>
             {/* Header for product name, product description, product category, product price, and product quantity */}
            <th>NAME</th> 
            <th>DESCRIPTION</th> 
            <th>CATEGORY</th> 
            <th>PRICE</th> 
            <th>QUANTITY</th> 
          </tr>
        </thead>
        <tbody>
          {/* Map through the products array to create table rows for each product */}
          {products.map((p, index) => (
            <tr key={index}> {/* Unique key for each row using the index */}
              {/* Displaying product name, product description, product category, product price, product quantity */}
              <td>{p.productName}</td> 
              <td>{p.productDescription}</td> 
              <td>{p.productCategory}</td> 
              <td>{p.productPrice}</td> 
              <td>{p.productQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard; // Exporting the Dashboard component