import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

const Home = () => {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    try {
      const res = await axios.post("http://localhost:3001/shorten", {
        originalUrl: url,
        customCode: custom,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <h1>🔗 URL Shortener</h1>
      <input
        style={styles.input}
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Custom code (optional)"
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
      />
      <button style={styles.button} onClick={handleShorten}>
        Shorten
      </button>
      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <strong>Short URL:</strong>{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

const Redirector = () => {
  const { code } = useParams();
  React.useEffect(() => {
    window.location.href = `http://localhost:3001/r/${code}`;
  }, [code]);

  return <p>Redirecting...</p>;
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  input: {
    padding: "10px",
    width: "300px",
    margin: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:code" element={<Redirector />} />
      </Routes>
    </Router>
  );
}
