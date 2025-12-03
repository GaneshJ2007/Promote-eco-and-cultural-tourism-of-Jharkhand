// // // backend/server.js
// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";

// // const app = express();
// // const PORT = 5000;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Connect MongoDB
// // mongoose.connect("mongodb://localhost:27017/myDatabase", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // // Schema + Model
// // const feedbackSchema = new mongoose.Schema({
// //   name: String,
// //   email: String,
// //   phone: String,
// //   feedback: String,
// //   rating: Number,
// //   createdAt: { type: Date, default: Date.now },
// // });

// // const Feedback = mongoose.model("Feedback", feedbackSchema);

// // // POST feedback
// // app.post("/api/feedback", async (req, res) => {
// //   try {
// //     console.log("📩 Incoming feedback:", req.body); // log request data
// //     const newFeedback = new Feedback(req.body);
// //     await newFeedback.save();
// //     res.status(201).json({ message: "Feedback saved successfully!" });
// //   } catch (err) {
// //     console.error("❌ Error saving feedback:", err); // log full error
// //     res.status(500).json({ error: err.message });
// //   }
// // });


// // // GET all feedback
// // app.get("/api/feedback", async (req, res) => {
// //   try {
// //     const feedbacks = await Feedback.find().sort({ createdAt: -1 });
// //     res.json(feedbacks);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));






// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// const PORT = 5000;

// // ======================
// // Middleware
// // ======================
// app.use(cors());
// app.use(express.json());

// // ======================
// // MongoDB Connection
// // ======================
// mongoose
//   .connect("mongodb://localhost:27017/myDatabase", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // ======================
// // 📌 Feedback Schema + Model
// // ======================
// const feedbackSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   feedback: String,
//   rating: Number,
//   createdAt: { type: Date, default: Date.now },
// });

// const Feedback = mongoose.model("Feedback", feedbackSchema);

// // POST feedback
// app.post("/api/feedback", async (req, res) => {
//   try {
//     console.log("📩 Incoming feedback:", req.body);
//     const newFeedback = new Feedback(req.body);
//     await newFeedback.save();
//     res.status(201).json({ message: "✅ Feedback saved successfully!" });
//   } catch (err) {
//     console.error("❌ Error saving feedback:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET all feedback
// app.get("/api/feedback", async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find().sort({ createdAt: -1 });
//     res.json(feedbacks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ======================
// // 📌 Orders Schema + Model
// // ======================
// const orderSchema = new mongoose.Schema({
//   userId: String,
//   cart: [
//     {
//       name: String,
//       price: String,
//       image: String,
//       quantity: { type: Number, default: 1 },
//     },
//   ],
//   totalPrice: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.model("Order", orderSchema);

// // POST order
// app.post("/api/orders", async (req, res) => {
//   try {
//     console.log("🛒 Incoming order:", req.body);
//     const newOrder = new Order(req.body);
//     await newOrder.save();
//     res.status(201).json({ message: "✅ Order saved successfully!" });
//   } catch (err) {
//     console.error("❌ Error saving order:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET all orders (admin use)
// app.get("/api/orders", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET orders by userId
// app.get("/api/orders/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({
//       createdAt: -1,
//     });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ======================
// // Start Server
// // ======================
// app.listen(PORT, () =>
//   console.log(`🚀 Server running at http://localhost:${PORT}`)
// );
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Sentiment from "sentiment"; // ✅ NEW
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;
const sentiment = new Sentiment(); // ✅ Initialize
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// MongoDB Connection
// ======================
mongoose
  .connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ======================
// 📌 Feedback Schema + Model
// ======================
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  feedback: String,
  rating: Number,
  sentiment: String, // ✅ NEW field
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// ======================
// POST feedback (with AI Sentiment)
// ======================
app.post("/api/feedback", async (req, res) => {
  try {
    console.log("📩 Incoming feedback:", req.body);

    const { name, email, phone, feedback, rating } = req.body;

    // Run sentiment analysis
    const result = sentiment.analyze(feedback);
    let sentimentLabel = "Neutral";
    if (result.score > 0) sentimentLabel = "Positive";
    else if (result.score < 0) sentimentLabel = "Negative";

    // Save feedback with sentiment
    const newFeedback = new Feedback({
      name,
      email,
      phone,
      feedback,
      rating,
      sentiment: sentimentLabel,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "✅ Feedback saved successfully!",
      sentiment: sentimentLabel,
    });
  } catch (err) {
    console.error("❌ Error saving feedback:", err);
    res.status(500).json({ error: err.message });
  }
});

// ======================
// GET all feedback
// ======================
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// 📌 Orders Schema + Model
// ======================
const orderSchema = new mongoose.Schema({
  userId: String,
  cart: [
    {
      name: String,
      price: String,
      image: String,
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// POST order
app.post("/api/orders", async (req, res) => {
  try {
    console.log("🛒 Incoming order:", req.body);
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "✅ Order saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all orders (admin use)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET orders by userId
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// 📌 Users Schema + Model
// ======================
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vendor: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ======================
// 📌 VendorItem Schema + Model
// ======================
const vendorItemSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  section: String,
  owner: String, // vendor email
  createdAt: { type: Date, default: Date.now },
});

const VendorItem = mongoose.model("VendorItem", vendorItemSchema);

// ======================
// User signup/login endpoints
// ======================
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, vendor } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email: email.toLowerCase(), password: hashed, vendor: !!vendor });
    await user.save();

    // Issue JWT
    const token = jwt.sign({ email: user.email, vendor: user.vendor }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "User created", token, email: user.email, vendor: user.vendor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "User not found" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ email: user.email, vendor: user.vendor }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ email: user.email, vendor: user.vendor, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Auth middleware
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing authorization" });
  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Invalid authorization format" });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Return current user
app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json({ email: user.email, vendor: user.vendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// Vendor item endpoints
// ======================
// Create vendor item
// Create vendor item (authenticated vendors only)
app.post("/api/vendor-items", authMiddleware, async (req, res) => {
  try {
    const { name, price, image, section } = req.body;
    const owner = req.user.email;
    if (!name || !price || !owner) return res.status(400).json({ error: "name, price and owner required" });

    // Only allow if user is vendor
    if (!req.user.vendor) return res.status(403).json({ error: "Only vendors can create items" });

    const item = new VendorItem({ name, price, image, section, owner });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// List all vendor items (optional query ?owner=)
app.get("/api/vendor-items", async (req, res) => {
  try {
    const q = {};
    if (req.query.owner) q.owner = req.query.owner;
    const items = await VendorItem.find(q).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get vendor items by owner
app.get("/api/vendor-items/vendor/:email", async (req, res) => {
  try {
    const items = await VendorItem.find({ owner: req.params.email }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete vendor item (owner must match request body owner)
// Delete vendor item (only owner vendor)
app.delete("/api/vendor-items/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const item = await VendorItem.findById(id);
    if (!item) return res.status(404).json({ error: "Not found" });
    if (item.owner !== req.user.email) return res.status(403).json({ error: "Forbidden" });
    if (!req.user.vendor) return res.status(403).json({ error: "Only vendors can delete items" });
    await item.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ======================
// Start Server
// ======================
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
