import React, { useState } from "react"; // Import React
import './App.css'; // Importing CSS for styling

const ProductManagement = ({ products, setProducts }) => {
  // State to manage product form inputs
  const [product, setProduct] = useState({ 
    name: "", 
    description: "", 
    category: "", 
    price: "", 
    quantity: "" 
  });

  
  const [editIndex, setEditIndex] = useState(null);

  
  
  const [showTable, setShowTable] = useState(true);
  
  
  const [message, setMessage] = useState(""); 

  // Function to handle adding or updating a product
  const handleAddProduct = () => {
    // Validate input to ensure all fields are filled and do not consist of whitespace
    if (
      product.name.trim() && 
      product.description.trim() && 
      product.category.trim() &&   
      product.price.trim() && 
      product.quantity.trim() 
    ) {
      // Creating a new product object
      const newProduct = {
        productName: product.name,
        productDescription: product.description,
        productCategory: product.category,
        productPrice: parseFloat(product.price),
        productQuantity: parseInt(product.quantity)
      };

      let updatedProducts; // Variable to hold the updated products list
      // Check if we are editing an existing product
      if (editIndex !== null) {
        // Update the specific product in the list
        updatedProducts = products.map((p, index) => (index === editIndex ? newProduct : p));
        setMessage("Product updated successfully!"); // Success message
      } else {
        // Otherwise, add the new product to the list
        updatedProducts = [...products, newProduct];
        setMessage("Product added successfully!"); // Success message
      }

      // Updating the products state and local storage
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      clearInputs(); // Clear inputs after adding or updating a product
    } else {
      // Set error message if validation fails
      setMessage("PLEASE FILL ALL PRODUCT DETAILS WITHOUT WHITESPACE.");
    }
  };

  // Function to clear input fields and reset the edit index
  const clearInputs = () => {
    setProduct({ name: "", description: "", category: "", price: "", quantity: "" }); // Reset input fields
    setEditIndex(null); // Reset editing index
    setMessage(""); // Clear message
  };

  // Function to handle product deletion
  const handleDeleteProduct = (index) => {
    // Filtering out the product to delete from the list
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts); // Updating the products state
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Update local storage
    setMessage("Product deleted successfully!"); // Success message
  };

  // Function to handle selling a product
  const handleSellProduct = (index) => {
    const productToSell = products[index]; // Get the product to sell
    const quantityToSell = prompt("PLEASE, ENTER QUANTITY TO SELL:", 1); // Prompting a user for quantity to sell

    if (quantityToSell !== null) {
      const quantity = parseInt(quantityToSell, 10); // Convert entered quantity to integer

      // Validating the entered quantity
      if (isNaN(quantity) || quantity <= 0) {
        setMessage("PLEASE ENTER VALID QUANTITY."); // Set error message
        return; // Exit function on invalid quantity
      }

      
      if (quantity > productToSell.productQuantity) {
        setMessage("NOT ENOUGH STOCK AVAILABLE!"); // Set error message
        return; // Exit function if not enough stock
      }

      // Deducting the product quantity
      productToSell.productQuantity -= quantity;

      // Alerting when product quantity is low
      if (productToSell.productQuantity === 4) {
        setMessage("WARNING: Only 4 products remaining!"); // Set warning message
      }

      const updatedProducts = [...products]; // Creating a new array of products
      setProducts(updatedProducts); 
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Updating local storage
    }
  };

  // Function to handle editing a product
  const handleEditProduct = (index) => {
    const productToEdit = products[index]; 
    // Populate the input fields with the selected product details
    setProduct({
      name: productToEdit.productName,
      description: productToEdit.productDescription,
      category: productToEdit.productCategory,
      price: productToEdit.productPrice,
      quantity: productToEdit.productQuantity
    });
    setEditIndex(index); 
    setMessage(""); // Clear message when editing
  };


  const toggleTableVisibility = () => {
    setShowTable(!showTable);
  };

  return (
    <div>
      <h2>PRODUCT MANAGEMENT</h2>
      {/* Display message */}
      {message && <p>{message}</p>} {/* Display success or error message */}
      {/* Input fields for product details */}
      <input type="text" placeholder="Product Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <input type="text" placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
      <input type="text" placeholder="Category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
      <input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
      <input type="number" placeholder="Quantity" value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
      {/* Button to add or update product */}
      <button onClick={handleAddProduct}>{editIndex !== null ? "UPDATE PRODUCT" : "ADD PRODUCT"}</button>
      
      
      <button onClick={toggleTableVisibility}>{showTable ? "HIDE INVENTORY" : "SHOW INVENTORY"}</button>

      {/* Conditionally render the inventory table */}
      {showTable && (
        <table border="1">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through products to display them in table rows */}
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p.productName}</td>
                <td>{p.productDescription}</td>
                <td>{p.productCategory}</td>
                <td>{p.productPrice}</td>
                <td>{p.productQuantity}</td>
                <td>
                  {/* Buttons for selling, editing, and deleting products */}
                  <button onClick={() => handleSellProduct(index)}>Sell</button>
                  <button onClick={() => handleEditProduct(index)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductManagement; // Exporting the productManagement component