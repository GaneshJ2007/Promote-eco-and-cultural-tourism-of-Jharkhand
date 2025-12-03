import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Payment form visibility and input states
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Animation visibility state
  const [showAnimation, setShowAnimation] = useState(false);

  const userId = "12345"; // Replace with real auth

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${userId}`);
        if (res.data.length > 0) {
          const latestOrder = res.data[0];
          setCartItems(
            latestOrder.cart.map((item) => ({
              ...item,
              quantity: item.quantity || 1,
            }))
          );
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const incrementQty = (index) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    setCartItems(updated);
  };

  const decrementQty = (index) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCartItems(updated);
    }
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowCheckoutForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, phone, email, cardNumber, expiry, cvv } = formData;
    if (!name || !phone || !email || !cardNumber || !expiry || !cvv) {
      alert("Please fill all payment details");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10-digit phone number");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email address");
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Enter a valid 16-digit card number");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Enter expiry in MM/YY format");
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert("Enter a valid 3-digit CVV");
      return false;
    }
    return true;
  };

  const handleSubmitPayment = () => {
    if (!validateForm()) return;

    setShowCheckoutForm(false);
    setShowAnimation(true);

    alert(`Order Placed!\nTotal Items: ${totalItems}\nTotal Price: ₹${totalPrice.toFixed(2)}`);

    setTimeout(() => {
      setShowAnimation(false);
      clearCart();
      setFormData({
        name: "",
        phone: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });
    }, 2500);
  };

  const handleCancelPayment = () => {
    setShowCheckoutForm(false);
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={styles.details}>
              <h3>{item.name}</h3>
              <p style={styles.price}>{item.price}</p>
              <p style={styles.subtotal}>
                {item.quantity} x {item.price} ={" "}
                <strong>
                  ₹{(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2)}
                </strong>
              </p>
            </div>
            <div style={styles.controls}>
              <button style={styles.qtyBtn} onClick={() => decrementQty(index)}>-</button>
              <span style={styles.qtyValue}>{item.quantity}</span>
              <button style={styles.qtyBtn} onClick={() => incrementQty(index)}>+</button>
              <button style={styles.removeBtn} onClick={() => removeItem(index)}>Remove</button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div style={styles.summary}>
          <h3>Total Items: {totalItems}</h3>
          <h3>
            Total Price: <span style={styles.price}>₹{totalPrice.toFixed(2)}</span>
          </h3>

          <div style={styles.actionRow}>
            <button style={styles.checkoutBtn} onClick={handleCheckoutClick}>
              ✅ Checkout
            </button>
            <button style={styles.clearBtn} onClick={clearCart}>
              🗑 Remove All Items
            </button>
          </div>
        </div>
      )}

      {/* Checkout form modal */}
      {showCheckoutForm && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Enter Payment Details</h3>
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              style={modalStyles.input}
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              style={modalStyles.input}
              maxLength={10}
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              style={modalStyles.input}
              type="email"
            />
            <input
              name="cardNumber"
              placeholder="Card Number (16 digits)"
              value={formData.cardNumber}
              onChange={handleInputChange}
              style={modalStyles.input}
              maxLength={16}
            />
            <input
              name="expiry"
              placeholder="Expiry (MM/YY)"
              value={formData.expiry}
              onChange={handleInputChange}
              style={modalStyles.input}
              maxLength={5}
            />
            <input
              name="cvv"
              placeholder="CVV (3 digits)"
              value={formData.cvv}
              onChange={handleInputChange}
              style={modalStyles.input}
              maxLength={3}
              type="password"
            />
            <div style={{ marginTop: 10 }}>
              <button onClick={handleSubmitPayment} style={modalStyles.submitBtn}>
                Submit
              </button>
              <button onClick={handleCancelPayment} style={modalStyles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order placed animation overlay */}
      {showAnimation && (
        <div style={animationStyles.overlay}>
          <div style={animationStyles.content}>
            <span style={{ fontSize: "3rem" }}>🎉</span>
            <p style={{ fontSize: "1.5rem", marginTop: 10 }}>Order Placed Successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
  modal: {
    background: "#fff",
    borderRadius: 12,
    padding: "20px 30px",
    width: "320px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    margin: "8px 0",
    borderRadius: 6,
    border: "1px solid #ddd",
    fontSize: 16,
  },
  submitBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    marginRight: 10,
    fontSize: 16,
  },
  cancelBtn: {
    background: "#dc3545",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
  },
};

const animationStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  content: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 20,
    boxShadow: "0 0 18px #28a745",
    color: "#28a745",
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 280,
  },
};

const styles = {
  page: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    background: "#f7f9fc",
    borderRadius: "10px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
    color: "#333",
  },
  card: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "12px",
    marginBottom: "20px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  image: {
    width: "100px",
    height: "auto",
    borderRadius: "10px",
    marginRight: "20px",
    objectFit: "cover",
  },
  details: {
    flex: 1,
  },
  price: {
    color: "#28a745",
    fontWeight: "bold",
  },
  subtotal: {
    fontSize: "14px",
    color: "#666",
    marginTop: "5px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  qtyBtn: {
    padding: "6px 12px",
    fontSize: "16px",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  qtyValue: {
    fontSize: "16px",
    minWidth: "20px",
    textAlign: "center",
  },
  removeBtn: {
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "6px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginLeft: "10px",
    transition: "background 0.3s",
  },
  summary: {
    marginTop: "30px",
    textAlign: "center",
  },
  actionRow: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  checkoutBtn: {
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  clearBtn: {
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#ffc107",
    color: "#333",
    border: "none",
    cursor: "pointer",
  },
};

export default Cart;
