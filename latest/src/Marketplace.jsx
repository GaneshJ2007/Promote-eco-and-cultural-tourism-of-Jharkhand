
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import productSections from "./data/productSections";

// const carouselImages = [
//   "https://img1.wsimg.com/isteam/ip/eb3f4e73-6e0a-4a8c-bcc0-81269ea8d49b/blob-c2d64b3.png/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:600,h:600,cg:true",
//   "https://cdn.shopify.com/s/files/1/1194/1498/files/b8_a2f452dd-5c72-4f22-9dbd-b8c114a86065_480x480.jpg?v=1713962766",
//   "https://myhandicraftindia.com/wp-content/uploads/2024/04/iyuu.jpg",
//   "https://5.imimg.com/data5/SELLER/Default/2021/11/BP/GX/XU/26392379/decorative-handmade-lamp-shade-500x500.jpg",
//   "https://m.media-amazon.com/images/I/81f4wOHxk5L._UF1000,1000_QL80_.jpg",
//   "https://content.jdmagicbox.com/comp/def_content/handicraft-item-dealers/12b942b856-handicraft-item-dealers-3-pakm6.jpg",
//   "https://media.assettype.com/outlooktraveller%2Fimport%2Foutlooktraveller%2Fpublic%2Fuploads%2Farticles%2Fexplore%2FOdisha_Raghurajpur.jpg?w=480&auto=format%2Ccompress&fit=max",
// ];

// const styles = {
//   container: {
//     backgroundImage:
//       "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxSLvsMD41_Uj6xRJ66Y8N9hy3taYNU1HuQ&s')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     minHeight: "100vh",
//     padding: "40px 20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   carouselWrapper: {
//     width: "100%",
//     maxWidth: "1200px",
//     margin: "0 auto 40px",
//     height: "400px",
//     position: "relative",
//     borderRadius: "16px",
//     overflow: "hidden",
//     boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
//   },
//   carouselImage: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     transition: "opacity 1s ease-in-out",
//     opacity: 0,
//   },
//   activeImage: {
//     opacity: 1,
//     zIndex: 1,
//   },
//   section: {
//     marginBottom: "50px",
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     borderRadius: "16px",
//     padding: "20px",
//     boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//   },
//   sectionTitle: {
//     fontSize: "28px",
//     marginBottom: "20px",
//     fontWeight: "600",
//     color: "#333",
//     borderBottom: "2px solid #007bff",
//     paddingBottom: "8px",
//   },
//   productGrid: {
//     display: "flex",
//     gap: "16px",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   card: {
//     margin: "0 auto 20px",
//     overflow: "hidden",
//     border: "1px solid #ddd",
//     borderRadius: "12px",
//     padding: "10px",
//     width: "200px",
//     textAlign: "center",
//     backgroundColor: "#ffffff",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//   },
//   productImage: {
//     width: "100%",
//     height: "150px",
//     objectFit: "cover",
//     borderRadius: "4px",
//   },
//   productName: {
//     fontSize: "16px",
//     fontWeight: "bold",
//     margin: "10px 0 5px",
//   },
//   productPrice: {
//     paddingBottom: "10px",
//     color: "green",
//     fontWeight: "500",
//   },
//   addToCartButton: {
//     marginTop: "10px",
//     padding: "8px 16px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   cartSummary: {
//     position: "fixed",
//     bottom: "20px",
//     right: "20px",
//     padding: "10px 20px",
//     backgroundColor: "rgba(0, 123, 255, 0.8)",
//     color: "#fff",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };


// const Marketplace = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [vendorItems, setVendorItems] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isVendor, setIsVendor] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % carouselImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     try {
//       const items = JSON.parse(localStorage.getItem("vendor_items") || "[]");
//       setVendorItems(items);
//     } catch (e) {
//       setVendorItems([]);
//     }
//     // Determine vendor status more robustly: vendor_token must exist and correspond
//     // to a registered user with vendor=true OR be a recognized vendor email.
//     try {
//       const vtRaw = localStorage.getItem("vendor_token");
//       const vt = vtRaw ? JSON.parse(vtRaw) : null;
//       const users = JSON.parse(localStorage.getItem("users") || "[]");
//       let confirmed = false;
//       if (vt && vt.email) {
//         const lower = vt.email.toLowerCase();
//         const found = users.find((u) => u.email.toLowerCase() === lower && u.vendor);
//         if (found) confirmed = true;
//         // fallback: allow explicit vendor domains/accounts
//         if (!confirmed && (lower === "vendor@gmail.com" || lower.endsWith("@vendor.com"))) confirmed = true;
//       }
//       setIsVendor(confirmed);
//     } catch (e) {
//       setIsVendor(false);
//     }
//   }, []);

//   const deleteVendorItem = (id) => {
//     // Only allow deletion if current vendor_token belongs to a confirmed vendor
//     const vtRaw = localStorage.getItem("vendor_token");
//     const vt = vtRaw ? JSON.parse(vtRaw) : null;
//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     const owner = vt?.email;
//     const isConfirmedVendor = owner && (users.find((u) => u.email.toLowerCase() === owner.toLowerCase() && u.vendor) || owner.toLowerCase() === "vendor@gmail.com" || owner.toLowerCase().endsWith("@vendor.com"));
//     if (!isConfirmedVendor) {
//       alert("Only vendors can delete uploads.");
//       return;
//     }
//     const items = JSON.parse(localStorage.getItem("vendor_items") || "[]");
//     const item = items.find((it) => it.id === id);
//     if (!item) return;
//     if (item.owner !== owner) {
//       alert("You can only delete your own uploads.");
//       return;
//     }
//     if (!confirm("Delete this product? This can't be undone.")) return;
//     const filtered = items.filter((it) => it.id !== id);
//     localStorage.setItem("vendor_items", JSON.stringify(filtered));
//     setVendorItems(filtered);
//   };

//   const addToCart = (product) => {
//     setCart((prev) => [...prev, { ...product, quantity: 1 }]);
//   };

//   const goToCart = async () => {
//     try {
//       const orderData = {
//         userId: "12345",
//         cart: cart,
//         totalPrice: cart
//           .reduce(
//             (sum, item) =>
//               sum +
//               parseInt(item.price.replace("₹", "")) * (item.quantity || 1),
//             0
//           )
//           .toString(),
//       };

//       const res = await axios.post("http://localhost:5000/api/orders", orderData);
//       console.log("✅ Order Saved:", res.data);

//       navigate("/cart", { state: { cart } });
//     } catch (err) {
//       console.error("❌ Error saving order:", err);
//       alert("Failed to save order");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Vendor toolbar */}
//       {isVendor && (
//         <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 12 }}>
//           <button
//             onClick={() => navigate("/vendor/upload")}
//             style={{ padding: "8px 12px", backgroundColor: "#0b5ed7", color: "#fff", border: "none", borderRadius: 6 }}
//           >
//             Upload product
//           </button>
//           <button
//             onClick={() => { localStorage.removeItem("vendor_token"); setIsVendor(false); }}
//             style={{ padding: "8px 12px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: 6 }}
//           >
//             Logout vendor
//           </button>
//         </div>
//       )}
//       {/* Carousel */}
//       <div style={styles.carouselWrapper}>
//         {carouselImages.map((src, i) => (
//           <img
//             key={i}
//             src={src}
//             alt={`slide-${i}`}
//             style={{
//               ...styles.carouselImage,
//               ...(i === activeIndex ? styles.activeImage : {}),
//             }}
//           />
//         ))}
//       </div>

//       {/* Product Sections */}

//       {/* Vendor Uploaded Items */}
//       {vendorItems && vendorItems.length > 0 && (
//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>Vendor Uploads</h2>
//           <div style={styles.productGrid}>
//             {vendorItems.map((item) => (
//               <div key={item.id} style={styles.card}>
//                 {item.image && (
//                   <img src={item.image} alt={item.name} style={styles.productImage} />
//                 )}
//                 <h3 style={styles.productName}>{item.name}</h3>
//                 <p style={styles.productPrice}>{item.price}</p>
//                 <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8 }}>
//                   <button
//                     style={styles.addToCartButton}
//                     onClick={() => addToCart(item)}
//                   >
//                     Add to Cart
//                   </button>
//                   {isVendor && (() => {
//                     try {
//                       const token = JSON.parse(localStorage.getItem("vendor_token") || "null");
//                       const owner = token?.email;
//                       if (item.owner === owner) {
//                         return (
//                           <button
//                             onClick={() => deleteVendorItem(item.id)}
//                             style={{ padding: "8px 12px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: 6 }}
//                           >
//                             Delete
//                           </button>
//                         );
//                       }
//                     } catch (e) {
//                       return null;
//                     }
//                     return null;
//                   })()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//       {productSections.map((section, i) => (
//         <div key={i} style={styles.section}>
//           <h2 style={styles.sectionTitle}>{section.section}</h2>
//           <div style={styles.productGrid}>
//             {section.items.map((item, j) => (
//               <div key={j} style={styles.card}>
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   style={styles.productImage}
//                 />
//                 <h3 style={styles.productName}>{item.name}</h3>
//                 <p style={styles.productPrice}>{item.price}</p>
//                 <button
//                   style={styles.addToCartButton}
//                   onClick={() => addToCart(item)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Floating Cart Button */}
//       {cart.length > 0 && (
//         <div style={styles.cartSummary} onClick={goToCart}>
//           🛒 Go to Cart ({cart.length})
//         </div>
//       )}
//     </div>
//   );
// };

// export default Marketplace;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import productSections from "./data/productSections";

const carouselImages = [
  "https://img1.wsimg.com/isteam/ip/eb3f4e73-6e0a-4a8c-bcc0-81269ea8d49b/blob-c2d64b3.png/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:600,h:600,cg:true",
  "https://cdn.shopify.com/s/files/1/1194/1498/files/b8_a2f452dd-5c72-4f22-9dbd-b8c114a86065_480x480.jpg?v=1713962766",
  "https://myhandicraftindia.com/wp-content/uploads/2024/04/iyuu.jpg",
  "https://5.imimg.com/data5/SELLER/Default/2021/11/BP/GX/XU/26392379/decorative-handmade-lamp-shade-500x500.jpg",
  "https://m.media-amazon.com/images/I/81f4wOHxk5L._UF1000,1000_QL80_.jpg",
  "https://content.jdmagicbox.com/comp/def_content/handicraft-item-dealers/12b942b856-handicraft-item-dealers-3-pakm6.jpg",
  "https://media.assettype.com/outlooktraveller%2Fimport%2Foutlooktraveller%2Fpublic%2Fuploads%2Farticles%2Fexplore%2FOdisha_Raghurajpur.jpg?w=480&auto=format%2Ccompress&fit=max",
];

const styles = {
  container: {
    backgroundImage:
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxSLvsMD41_Uj6xRJ66Y8N9hy3taYNU1HuQ&s')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",      // 👈 always full height
    width: "100vw",       // 👈 always full width
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowY: "auto",    // 👈 scroll if content is taller than screen
  },
  carouselWrapper: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto 40px",
    height: "400px",
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
  },
  carouselImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 1s ease-in-out",
    opacity: 0,
  },
  activeImage: {
    opacity: 1,
    zIndex: 1,
  },
  section: {
    marginBottom: "50px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "28px",
    marginBottom: "20px",
    fontWeight: "600",
    color: "#333",
    borderBottom: "2px solid #007bff",
    paddingBottom: "8px",
  },
  productGrid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    margin: "0 auto 20px",
    overflow: "hidden",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "10px",
    width: "200px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  productImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "10px 0 5px",
  },
  productPrice: {
    paddingBottom: "10px",
    color: "green",
    fontWeight: "500",
  },
  addToCartButton: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cartSummary: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: "rgba(0, 123, 255, 0.8)",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const Marketplace = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [vendorItems, setVendorItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("vendor_items") || "[]");
      setVendorItems(items);
    } catch (e) {
      setVendorItems([]);
    }
    try {
      const vtRaw = localStorage.getItem("vendor_token");
      const vt = vtRaw ? JSON.parse(vtRaw) : null;
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      let confirmed = false;
      if (vt && vt.email) {
        const lower = vt.email.toLowerCase();
        const found = users.find((u) => u.email.toLowerCase() === lower && u.vendor);
        if (found) confirmed = true;
        if (!confirmed && (lower === "vendor@gmail.com" || lower.endsWith("@vendor.com"))) confirmed = true;
      }
      setIsVendor(confirmed);
    } catch (e) {
      setIsVendor(false);
    }
  }, []);

  const deleteVendorItem = (id) => {
    const vtRaw = localStorage.getItem("vendor_token");
    const vt = vtRaw ? JSON.parse(vtRaw) : null;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const owner = vt?.email;
    const isConfirmedVendor =
      owner &&
      (users.find((u) => u.email.toLowerCase() === owner.toLowerCase() && u.vendor) ||
        owner.toLowerCase() === "vendor@gmail.com" ||
        owner.toLowerCase().endsWith("@vendor.com"));
    if (!isConfirmedVendor) {
      alert("Only vendors can delete uploads.");
      return;
    }
    const items = JSON.parse(localStorage.getItem("vendor_items") || "[]");
    const item = items.find((it) => it.id === id);
    if (!item) return;
    if (item.owner !== owner) {
      alert("You can only delete your own uploads.");
      return;
    }
    if (!window.confirm("Delete this product? This can't be undone.")) return;
    const filtered = items.filter((it) => it.id !== id);
    localStorage.setItem("vendor_items", JSON.stringify(filtered));
    setVendorItems(filtered);
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const goToCart = async () => {
    try {
      const orderData = {
        userId: "12345",
        cart: cart,
        totalPrice: cart
          .reduce(
            (sum, item) =>
              sum + parseInt(item.price.replace("₹", "")) * (item.quantity || 1),
            0
          )
          .toString(),
      };

      const res = await axios.post("http://localhost:5000/api/orders", orderData);
      console.log("✅ Order Saved:", res.data);

      navigate("/cart", { state: { cart } });
    } catch (err) {
      console.error("❌ Error saving order:", err);
      alert("Failed to save order");
    }
  };

  return (
    <div style={styles.container}>
      {/* Vendor toolbar */}
      {isVendor && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 12 }}>
          <button
            onClick={() => navigate("/vendor/upload")}
            style={{ padding: "8px 12px", backgroundColor: "#0b5ed7", color: "#fff", border: "none", borderRadius: 6 }}
          >
            Upload product
          </button>
          <button
            onClick={() => { localStorage.removeItem("vendor_token"); setIsVendor(false); }}
            style={{ padding: "8px 12px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: 6 }}
          >
            Logout vendor
          </button>
        </div>
      )}

      {/* Carousel */}
      <div style={styles.carouselWrapper}>
        {carouselImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            style={{
              ...styles.carouselImage,
              ...(i === activeIndex ? styles.activeImage : {}),
            }}
          />
        ))}
      </div>

      {/* Vendor Uploaded Items */}
      {vendorItems && vendorItems.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Vendor Uploads</h2>
          <div style={styles.productGrid}>
            {vendorItems.map((item) => (
              <div key={item.id} style={styles.card}>
                {item.image && (
                  <img src={item.image} alt={item.name} style={styles.productImage} />
                )}
                <h3 style={styles.productName}>{item.name}</h3>
                <p style={styles.productPrice}>{item.price}</p>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8 }}>
                  <button
                    style={styles.addToCartButton}
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                  {isVendor && (() => {
                    try {
                      const token = JSON.parse(localStorage.getItem("vendor_token") || "null");
                      const owner = token?.email;
                      if (item.owner === owner) {
                        return (
                          <button
                            onClick={() => deleteVendorItem(item.id)}
                            style={{ padding: "8px 12px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: 6 }}
                          >
                            Delete
                          </button>
                        );
                      }
                    } catch (e) {
                      return null;
                    }
                    return null;
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Default product sections */}
      {productSections.map((section, i) => (
        <div key={i} style={styles.section}>
          <h2 style={styles.sectionTitle}>{section.section}</h2>
          <div style={styles.productGrid}>
            {section.items.map((item, j) => (
              <div key={j} style={styles.card}>
                <img src={item.image} alt={item.name} style={styles.productImage} />
                <h3 style={styles.productName}>{item.name}</h3>
                <p style={styles.productPrice}>{item.price}</p>
                <button
                  style={styles.addToCartButton}
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div style={styles.cartSummary} onClick={goToCart}>
          🛒 Go to Cart ({cart.length})
        </div>
      )}
    </div>
  );
};

export default Marketplace;
