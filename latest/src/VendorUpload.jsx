// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function VendorUpload() {
// //   const navigate = useNavigate();

// //   // Form state
// //   const [productName, setProductName] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [imageLink, setImageLink] = useState("");

// //   // Logout handler
// //   const handleLogout = () => {
// //     localStorage.removeItem("auth_token");
// //     localStorage.removeItem("vendor_token");
// //     localStorage.removeItem("gov_token");
// //     navigate("/login", { replace: true });
// //   };

// //   // Form submit handler
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!productName || !category || !price || !description || !imageLink) {
// //       alert("Please fill all fields.");
// //       return;
// //     }

// //     const products = JSON.parse(localStorage.getItem("vendor_products") || "[]");
// //     const newProduct = { productName, category, price, description, imageLink };
// //     products.push(newProduct);
// //     localStorage.setItem("vendor_products", JSON.stringify(products));

// //     alert("Product uploaded successfully!");
// //     // Clear form
// //     setProductName("");
// //     setCategory("");
// //     setPrice("");
// //     setDescription("");
// //     setImageLink("");
// //   };

// //   return (
// //     <div>
// //       {/* Navbar for vendor */}
// //       <nav
// //         style={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           padding: "12px 24px",
// //           backgroundColor: "#f6f8fa",
// //           borderBottom: "1px solid #ddd",
// //         }}
// //       >
// //         <h2>📦 Vendor Upload Portal</h2>
// //         <button
// //           onClick={handleLogout}
// //           style={{
// //             padding: "6px 12px",
// //             background: "red",
// //             color: "white",
// //             border: "none",
// //             borderRadius: "6px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           Logout
// //         </button>
// //       </nav>

// //       {/* Upload content */}
// //       <div
// //         style={{
// //           maxWidth: "600px",
// //           margin: "40px auto",
// //           padding: "20px",
// //           border: "1px solid #ddd",
// //           borderRadius: "10px",
// //           backgroundColor: "#f9f9f9",
// //         }}
// //       >
// //         <h3>Upload Your Products/Services</h3>
// //         <form onSubmit={handleSubmit}>
// //           <div style={{ marginBottom: "12px" }}>
// //             <label>Product Name</label>
// //             <input
// //               type="text"
// //               value={productName}
// //               onChange={(e) => setProductName(e.target.value)}
// //               placeholder="Enter product name"
// //               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
// //             />
// //           </div>

// //           <div style={{ marginBottom: "12px" }}>
// //             <label>Category</label>
// //             <input
// //               type="text"
// //               value={category}
// //               onChange={(e) => setCategory(e.target.value)}
// //               placeholder="Enter product category"
// //               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
// //             />
// //           </div>

// //           <div style={{ marginBottom: "12px" }}>
// //             <label>Price</label>
// //             <input
// //               type="number"
// //               value={price}
// //               onChange={(e) => setPrice(e.target.value)}
// //               placeholder="Enter price"
// //               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
// //             />
// //           </div>

// //           <div style={{ marginBottom: "12px" }}>
// //             <label>Description</label>
// //             <textarea
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //               placeholder="Enter product description"
// //               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
// //             />
// //           </div>

// //           <div style={{ marginBottom: "12px" }}>
// //             <label>Image Link</label>
// //             <input
// //               type="text"
// //               value={imageLink}
// //               onChange={(e) => setImageLink(e.target.value)}
// //               placeholder="Enter image URL"
// //               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             style={{
// //               padding: "8px 16px",
// //               backgroundColor: "#4CAF50",
// //               color: "white",
// //               border: "none",
// //               borderRadius: "6px",
// //               cursor: "pointer",
// //             }}
// //           >
// //             Upload
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function VendorUpload() {
//   const navigate = useNavigate();

//   // Form state
//   const [productName, setProductName] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageLink, setImageLink] = useState("");

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("vendor_token");
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("gov_token");
//     navigate("/login", { replace: true });
//   };

//   // Form submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!productName || !category || !price || !description || !imageLink) {
//       alert("Please fill all fields.");
//       return;
//     }

//     // Load existing vendor items
//     const vendorItems = JSON.parse(localStorage.getItem("vendor_items") || "[]");

//     // Create new product with id and owner
//     const owner = JSON.parse(localStorage.getItem("vendor_token"))?.email || "unknown";
//     const newItem = {
//       id: Date.now(),
//       name: productName,
//       category,
//       price,
//       description,
//       image: imageLink,
//       owner,
//     };

//     vendorItems.push(newItem);
//     localStorage.setItem("vendor_items", JSON.stringify(vendorItems));

//     alert("Product uploaded successfully!");

//     // Clear form
//     setProductName("");
//     setCategory("");
//     setPrice("");
//     setDescription("");
//     setImageLink("");
//   };

//   return (
//     <div>
//       <nav
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "12px 24px",
//           backgroundColor: "#f6f8fa",
//           borderBottom: "1px solid #ddd",
//         }}
//       >
//         <h2>📦 Vendor Upload Portal</h2>
//         <button
//           onClick={handleLogout}
//           style={{
//             padding: "6px 12px",
//             background: "red",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//           }}
//         >
//           Logout
//         </button>
//       </nav>

//       <div
//         style={{
//           maxWidth: "600px",
//           margin: "40px auto",
//           padding: "20px",
//           border: "1px solid #ddd",
//           borderRadius: "10px",
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         <h3>Upload Your Products/Services</h3>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: "12px" }}>
//             <label>Product Name</label>
//             <input
//               type="text"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               placeholder="Enter product name"
//               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
//             />
//           </div>
//           <div style={{ marginBottom: "12px" }}>
//             <label>Category</label>
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               placeholder="Enter product category"
//               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
//             />
//           </div>
//           <div style={{ marginBottom: "12px" }}>
//             <label>Price</label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="Enter price"
//               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
//             />
//           </div>
//           <div style={{ marginBottom: "12px" }}>
//             <label>Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter product description"
//               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
//             />
//           </div>
//           <div style={{ marginBottom: "12px" }}>
//             <label>Image Link</label>
//             <input
//               type="text"
//               value={imageLink}
//               onChange={(e) => setImageLink(e.target.value)}
//               placeholder="Enter image URL"
//               style={{ width: "100%", padding: "8px", marginTop: "6px" }}
//             />
//           </div>

//           <button
//             type="submit"
//             style={{
//               padding: "8px 16px",
//               backgroundColor: "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             Upload
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Marketplace = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [vendorItems, setVendorItems] = useState([]);
//   const [isVendor, setIsVendor] = useState(false);
//   const [vendorEmail, setVendorEmail] = useState("");

//   useEffect(() => {
//     // Load all vendor items
//     const items = JSON.parse(localStorage.getItem("vendor_items") || "[]");
//     setVendorItems(items);

//     // Check if current user is vendor
//     const token = JSON.parse(localStorage.getItem("vendor_token") || "null");
//     if (token?.email) {
//       setIsVendor(true);
//       setVendorEmail(token.email);
//     }
//   }, []);

//   // Delete only by owner
//   const deleteVendorItem = (id) => {
//     const items = JSON.parse(localStorage.getItem("vendor_items") || "[]");
//     const item = items.find((i) => i.id === id);

//     if (!item) return alert("Item not found!");
//     if (item.owner !== vendorEmail) return alert("You can only delete your own item!");

//     if (!window.confirm("Are you sure you want to delete this item?")) return;

//     const updated = items.filter((i) => i.id !== id);
//     localStorage.setItem("vendor_items", JSON.stringify(updated));
//     setVendorItems(updated);
//   };

//   const addToCart = (item) => {
//     setCart((prev) => [...prev, { ...item, quantity: 1 }]);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Marketplace</h1>

//       {vendorItems.length === 0 && <p>No vendor items uploaded yet.</p>}

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {vendorItems.map((item) => (
//           <div
//             key={item.id}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               padding: "10px",
//               width: "200px",
//             }}
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               style={{ width: "100%", height: "150px", objectFit: "cover" }}
//             />
//             <h3>{item.name}</h3>
//             <p>{item.price}</p>
//             <button onClick={() => addToCart(item)}>Add to Cart</button>

//             {/* Delete button only for vendor owner */}
//             {isVendor && item.owner === vendorEmail && (
//               <button
//                 onClick={() => deleteVendorItem(item.id)}
//                 style={{ background: "red", color: "white", marginTop: "8px" }}
//               >
//                 Delete
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {cart.length > 0 && (
//         <div style={{ position: "fixed", bottom: 20, right: 20 }}>
//           <button
//             onClick={() => navigate("/cart", { state: { cart } })}
//             style={{ padding: "10px 20px", background: "blue", color: "#fff" }}
//           >
//             Go to Cart ({cart.length})
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Marketplace;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorUpload() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [vendorItems, setVendorItems] = useState([]);
  const [vendorEmail, setVendorEmail] = useState("");

  // Load vendor items and email from localStorage
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("vendor_token") || "{}");
    setVendorEmail(token.email || "");

    const items = JSON.parse(localStorage.getItem("vendor_items") || "[]");
    setVendorItems(items);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("vendor_token");
    navigate("/login", { replace: true });
  };

  // Upload product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !category || !price || !description || !imageLink) {
      return alert("Please fill all fields.");
    }

    const newProduct = {
      id: Date.now(),
      owner: vendorEmail,
      name: productName,
      category,
      price,
      description,
      image: imageLink,
    };

    const updatedItems = [...vendorItems, newProduct];
    localStorage.setItem("vendor_items", JSON.stringify(updatedItems));
    setVendorItems(updatedItems);

    alert("Product uploaded successfully!");
    setProductName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setImageLink("");
  };

  // Delete product
  const deleteProduct = (id) => {
    const item = vendorItems.find((i) => i.id === id);
    if (!item) return;
    if (item.owner !== vendorEmail) return alert("You can only delete your own products!");
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const updatedItems = vendorItems.filter((i) => i.id !== id);
    localStorage.setItem("vendor_items", JSON.stringify(updatedItems));
    setVendorItems(updatedItems);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Vendor Upload Portal</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          placeholder="Image Link"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", background: "green", color: "#fff", border: "none" }}
        >
          Upload Product
        </button>
      </form>

      <h3>Uploaded Products</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {vendorItems.map((item) => (
          <div
            key={item.id}
            style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", width: "180px" }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "120px", objectFit: "cover", marginBottom: "5px" }}
            />
            <h4>{item.name}</h4>
            <p>{item.price}</p>
            <button
              onClick={() => deleteProduct(item.id)}
              style={{ padding: "6px 10px", background: "red", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
