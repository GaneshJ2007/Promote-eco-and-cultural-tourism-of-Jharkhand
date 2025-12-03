import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

export default function FeedbackDashboard() {
  const navigate = useNavigate();
  const [feedbackList, setFeedbackList] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    setFeedbackList(feedbacks);

    // Pie chart: rating distribution
    const ratingCount = [1, 2, 3, 4, 5].map(star => ({
      name: `${star} Star`,
      value: feedbacks.filter(fb => fb.rating === star).length
    }));
    setRatingData(ratingCount);

    // Bar chart: feedbacks per day
    const dayMap = {};
    feedbacks.forEach(fb => {
      const day = new Date(fb.date).toLocaleDateString();
      dayMap[day] = (dayMap[day] || 0) + 1;
    });
    const barData = Object.keys(dayMap).map(day => ({ date: day, count: dayMap[day] }));
    setDailyData(barData);

    // Line chart: average rating over time
    const sorted = [...feedbacks].sort((a, b) => new Date(a.date) - new Date(b.date));
    const line = [];
    let total = 0;
    sorted.forEach((fb, index) => {
      total += fb.rating;
      line.push({ index: index + 1, avgRating: total / (index + 1) });
    });
    setLineData(line);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("gov_token"); // clear government official token
    navigate("/login", { replace: true }); // redirect to login page
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>📊 Feedback Dashboard</h2>
      <button
        onClick={handleLogout}
        style={{
          marginBottom: 20,
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

      {feedbackList.length === 0 ? (
        <p>No feedbacks yet.</p>
      ) : (
        <>
          <h3>Feedback Table</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>ID</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Name</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Email</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Feedback</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Rating</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((fb, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{index + 1}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{fb.name}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{fb.email}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{fb.message}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{fb.rating}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{fb.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Rating Distribution (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={ratingData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {ratingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <h3>Feedbacks per Day (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <h3>Average Rating Over Time (Line Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="index" label={{ value: "Feedback #", position: "insideBottomRight", offset: -5 }} />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgRating" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
