import React, { useState } from "react";
import "./feedback.css"; // import the CSS file

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0); // star rating 1-5
  const [hover, setHover] = useState(0);   // hover effect
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message || rating === 0) {
      alert("Please fill all fields and select a rating");
      return;
    }

    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    const newFeedback = {
      name,
      email,
      message,
      rating,
      date: new Date().toLocaleString(),
    };
    feedbacks.push(newFeedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    setSuccess("Feedback submitted successfully!");
    setName("");
    setEmail("");
    setMessage("");
    setRating(0);
    setHover(0);
  };

  return (
    <div className="form-container">
      <h2>📝 Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Feedback</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />

        <label>Rating</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= (hover || rating) ? "filled" : ""}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
          <span>{rating}/5</span>
        </div>

        <button type="submit">Submit</button>
        {success && <p style={{ color: "green", marginTop: 10 }}>{success}</p>}
      </form>
    </div>
  );
}
