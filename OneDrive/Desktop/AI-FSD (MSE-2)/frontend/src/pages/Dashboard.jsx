import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [type, setType] = useState("lost"); // 🔥 NEW

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  const addItem = async () => {
    if (!title) return alert("Enter item name");

    await axios.post(
      "http://localhost:5000/api/items",
      {
        title,
        description: "Item",
        category: "General",
        type: type, // 🔥 dynamic
        location: "Campus",
      },
      {
        headers: { Authorization: token },
      }
    );

    setTitle("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`, {
      headers: { Authorization: token },
    });
    fetchItems();
  };

  const searchItems = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/items/search?q=${query}`
    );
    setItems(res.data);
  };

  const updateItem = async (id) => {
    await axios.put(
      `http://localhost:5000/api/items/${id}`,
      { title },
      { headers: { Authorization: token } }
    );

    setEditingId(null);
    setTitle("");
    fetchItems();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      
      <h2>Dashboard</h2>

      <button onClick={logout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      {/* ADD ITEM */}
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter item"
        />

        {/* 🔥 TYPE SELECT */}
        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <button onClick={addItem}>Add</button>
      </div>

      {/* SEARCH */}
      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Search item"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchItems}>Search</button>
        <button onClick={fetchItems}>Reset</button>
      </div>

      {/* LOST ITEMS */}
      <h3 style={{ marginTop: "30px" }}>Lost Items</h3>
      {items
        .filter((item) => item.type === "lost")
        .map((item) => (
          <div key={item._id} style={{
            background: "#2c2c3e",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px"
          }}>
            {editingId === item._id ? (
              <>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={() => updateItem(item._id)}>Save</button>
              </>
            ) : (
              <>
                <p>{item.title}</p>
                <button onClick={() => {
                  setEditingId(item._id);
                  setTitle(item.title);
                }}>
                  Edit
                </button>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </>
            )}
          </div>
        ))}

      {/* FOUND ITEMS */}
      <h3>Found Items</h3>
      {items
        .filter((item) => item.type === "found")
        .map((item) => (
          <div key={item._id} style={{
            background: "#2c2c3e",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px"
          }}>
            {editingId === item._id ? (
              <>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={() => updateItem(item._id)}>Save</button>
              </>
            ) : (
              <>
                <p>{item.title}</p>
                <button onClick={() => {
                  setEditingId(item._id);
                  setTitle(item.title);
                }}>
                  Edit
                </button>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
    </div>
  );
}