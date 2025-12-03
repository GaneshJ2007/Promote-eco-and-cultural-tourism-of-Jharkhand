
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
// import Home from "./Home.jsx";
// import Marketplace from "./Marketplace.jsx";
// import Cart from "./Cart.jsx";
// import Feedback from "./Feedback.jsx";
// import FeedbackDashboard from "./FeedbackDashboard.jsx";
// import Login from "./Login.jsx";
// import Signup from "./Signup.jsx";
// import RequireAuth from "./RequireAuth.jsx";
// import RequireVendor from "./RequireVendor.jsx";
// import RequireGov from "./RequireGov.jsx";
// import VendorUpload from "./VendorUpload.jsx";
// import VendorLogin from "./VendorLogin.jsx";

// // ---------------- CUSTOMER NAVBAR ----------------
// function CustomerNavbar({ onLogout }) {
//   const navigate = useNavigate();

//   return (
//     <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
//       <button
//         onClick={() => navigate("/home")}
//         style={{
//           backgroundColor: "blue",
//           color: "white",
//           padding: "6px 12px",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//         }}
//       >
//         Home
//       </button>

//       <button
//         onClick={() => navigate("/marketplace")}
//         style={{
//           backgroundColor: "blue",
//           color: "white",
//           padding: "6px 12px",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//         }}
//       >
//         Marketplace
//       </button>

//       <button
//         onClick={() => navigate("/feedback")}
//         style={{
//           backgroundColor: "blue",
//           color: "white",
//           padding: "6px 12px",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//         }}
//       >
//         Feedback
//       </button>

//       <button
//         onClick={onLogout}
//         style={{
//           marginLeft: "20px",
//           padding: "6px 12px",
//           background: "red",
//           color: "white",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//         }}
//       >
//         Logout
//       </button>
//     </nav>
//   );
// }

// // ---------------- VENDOR NAVBAR ----------------
// function VendorNavbar({ onLogout }) {
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ check current path

//   return (
//     <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
//       <button
//         onClick={() => navigate("/vendor/upload")}
//         style={{
//           backgroundColor: "blue",
//           color: "white",
//           padding: "6px 12px",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//         }}
//       >
//         Upload Items
//       </button>

//       <button
//         onClick={() => navigate("/vendor/marketplace")}
//         style={{
//           backgroundColor: "blue",
//           color: "white",
//           padding: "6px 12px",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//         }}
//       >
//         Marketplace
//       </button>

//       {/* ✅ Hide Feedback ONLY on /vendor/upload */}
//       {location.pathname !== "/vendor/upload" && (
//         <button
//           onClick={() => navigate("/feedback")}
//           style={{
//             backgroundColor: "blue",
//             color: "white",
//             padding: "6px 12px",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//           }}
//         >
//           Feedback
//         </button>
//       )}

//       <button
//         onClick={onLogout}
//         style={{
//           marginLeft: "20px",
//           padding: "6px 12px",
//           background: "red",
//           color: "white",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//         }}
//       >
//         Logout
//       </button>
//     </nav>
//   );
// }

// // ---------------- CUSTOMER LAYOUT ----------------
// function CustomerLayout({ children }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("vendor_token");
//     localStorage.removeItem("gov_token");
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div>
//       <CustomerNavbar onLogout={handleLogout} />
//       {children}
//     </div>
//   );
// }

// // ---------------- VENDOR LAYOUT ----------------
// function VendorLayout({ children }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("vendor_token");
//     localStorage.removeItem("gov_token");
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div>
//       <VendorNavbar onLogout={handleLogout} />
//       {children}
//     </div>
//   );
// }

// // ---------------- MARKETPLACE WRAPPER ----------------
// function MarketplaceWrapper() {
//   const isVendor = !!localStorage.getItem("vendor_token");
//   return <Marketplace vendor={isVendor} />;
// }

// // ---------------- APP ----------------
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default → always go to login first */}
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* Public */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/vendor-login" element={<VendorLogin />} />

//         {/* Protected Customer Pages */}
//         <Route
//           path="/home"
//           element={
//             <RequireAuth>
//               <CustomerLayout>
//                 <Home />
//               </CustomerLayout>
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/marketplace"
//           element={
//             <RequireAuth>
//               <CustomerLayout>
//                 <MarketplaceWrapper />
//               </CustomerLayout>
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/feedback"
//           element={
//             <RequireAuth>
//               <CustomerLayout>
//                 <Feedback />
//               </CustomerLayout>
//             </RequireAuth>
//           }
//         />
//         <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />

//         {/* Protected Vendor Pages */}
//         <Route
//           path="/vendor/upload"
//           element={
//             <RequireVendor>
//               <VendorLayout>
//                 <VendorUpload />
//               </VendorLayout>
//             </RequireVendor>
//           }
//         />
//         <Route
//           path="/vendor/marketplace"
//           element={
//             <RequireVendor>
//               <VendorLayout>
//                 <MarketplaceWrapper />
//               </VendorLayout>
//             </RequireVendor>
//           }
//         />

//         {/* Protected Government Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <RequireGov>
//               <FeedbackDashboard />
//             </RequireGov>
//           }
//         />

//         {/* Catch all → redirect based on role */}
//         <Route
//           path="*"
//           element={
//             localStorage.getItem("auth_token") ? <Navigate to="/home" replace /> :
//             localStorage.getItem("vendor_token") ? <Navigate to="/vendor/upload" replace /> :
//             localStorage.getItem("gov_token") ? <Navigate to="/dashboard" replace /> :
//             <Navigate to="/login" replace />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import Marketplace from "./Marketplace.jsx";
import Cart from "./Cart.jsx";
import Feedback from "./Feedback.jsx";
import FeedbackDashboard from "./FeedbackDashboard.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import RequireAuth from "./RequireAuth.jsx";
import RequireVendor from "./RequireVendor.jsx";
import RequireGov from "./RequireGov.jsx";
import VendorUpload from "./VendorUpload.jsx";
import VendorLogin from "./VendorLogin.jsx";

// ---------------- CUSTOMER NAVBAR ----------------
function CustomerNavbar({ onLogout }) {
  const navigate = useNavigate();

  return (
    <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
      <button
        onClick={() => navigate("/home")}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Home
      </button>

      <button
        onClick={() => navigate("/marketplace")}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Marketplace
      </button>

      <button
        onClick={() => navigate("/feedback")}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Feedback
      </button>

      <button
        onClick={onLogout}
        style={{
          marginLeft: "20px",
          padding: "6px 12px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

// ---------------- VENDOR NAVBAR ----------------
function VendorNavbar({ onLogout }) {
  const navigate = useNavigate();

  return (
    <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
      <button
        onClick={() => navigate("/vendor/upload")}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Upload Items
      </button>

      <button
        onClick={() => navigate("/vendor/marketplace")}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Marketplace
      </button>

      {/* 🚫 Removed Feedback button completely */}

      <button
        onClick={onLogout}
        style={{
          marginLeft: "20px",
          padding: "6px 12px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

// ---------------- CUSTOMER LAYOUT ----------------
function CustomerLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("gov_token");
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <CustomerNavbar onLogout={handleLogout} />
      {children}
    </div>
  );
}

// ---------------- VENDOR LAYOUT ----------------
function VendorLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("gov_token");
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <VendorNavbar onLogout={handleLogout} />
      {children}
    </div>
  );
}

// ---------------- MARKETPLACE WRAPPER ----------------
function MarketplaceWrapper() {
  const isVendor = !!localStorage.getItem("vendor_token");
  return <Marketplace vendor={isVendor} />;
}

// ---------------- APP ----------------
function App() {
  return (
    <Router>
      <Routes>
        {/* Default → always go to login first */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-login" element={<VendorLogin />} />

        {/* Protected Customer Pages */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <CustomerLayout>
                <Home />
              </CustomerLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/marketplace"
          element={
            <RequireAuth>
              <CustomerLayout>
                <MarketplaceWrapper />
              </CustomerLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/feedback"
          element={
            <RequireAuth>
              <CustomerLayout>
                <Feedback />
              </CustomerLayout>
            </RequireAuth>
          }
        />
        <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />

        {/* Protected Vendor Pages */}
        <Route
          path="/vendor/upload"
          element={
            <RequireVendor>
              <VendorLayout>
                <VendorUpload />
              </VendorLayout>
            </RequireVendor>
          }
        />
        <Route
          path="/vendor/marketplace"
          element={
            <RequireVendor>
              <VendorLayout>
                <MarketplaceWrapper />
              </VendorLayout>
            </RequireVendor>
          }
        />

        {/* Protected Government Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RequireGov>
              <FeedbackDashboard />
            </RequireGov>
          }
        />

        {/* Catch all → redirect based on role */}
        <Route
          path="*"
          element={
            localStorage.getItem("auth_token") ? <Navigate to="/home" replace /> :
            localStorage.getItem("vendor_token") ? <Navigate to="/vendor/upload" replace /> :
            localStorage.getItem("gov_token") ? <Navigate to="/dashboard" replace /> :
            <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

