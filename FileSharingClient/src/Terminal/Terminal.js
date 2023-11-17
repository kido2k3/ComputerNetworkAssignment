import { Box } from "@mui/material";
import React, { useState } from "react";
import ContentDiscoverTerminal from "./ContentDiscoverTerminal/ContentDiscoverTerminal";
import ContentPing from "./ContentPing/ContentPing";
import "./Terminal.css";
import ContentFetchTerminal from "./ContentFetchTerminal/ContentFetchTerminal";
export default function Terminal() {
  const [hostname, setHostName] = useState("");
  const [type, setType] = useState("");
  const [files, setFiles] = useState([]);
  const [ping, setPing] = useState({});
  const handleOnClickDiscover = () => {
    if (hostname !== "") {
      setType("discover");
      fetch(`http://localhost:3000/userfiles/${hostname}`)
        .then((res) => res.json())
        .then((data) => setFiles(data.result));
    }
  };
  const handleOnClickPing = () => {
    if (hostname !== "") {
      setType("ping");
      fetch(`http://localhost:3000/online/${hostname}`)
        .then((res) => res.json())
        .then((data) => setPing(data));
    }
  };
  const handleOnClickFetch = () => {
    if (hostname !== "") {
      setType("fetch");
    }
  };
  return (
    <Box
      sx={{
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          height: "80%",
          width: "100%",
          backgroundColor: "black",
          marginBottom: "20px",
          boxSizing: "border-box",
          padding: "20px",
        }}
      >
        {type === "discover" && (
          <ContentDiscoverTerminal files={files} hostname={hostname} />
        )}
        {type === "ping" && <ContentPing ping={ping} />}
        {type === "fetch" && <ContentFetchTerminal />}
      </Box>{" "}
      <button
        className="discoverButton"
        onClick={handleOnClickFetch}
        style={{
          padding: "12px 25px",
          cursor: "pointer",
          borderRadius: ".25rem",
          border: "none",
          outline: "none",
          backgroundColor: "#0d6efd",
          transition: "0.5s",
          color: "#fff",
          fontWeight: "bolder",
          marginBottom: "20px",
        }}
      >
        Fetch
      </button>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          onChange={(e) => {
            setHostName(e.target.value);
          }}
          placeholder="Enter to run command"
          style={{ width: "auto", boxSizing: "border-box", padding: "10px" }}
        />
        <button
          className="discoverButton"
          onClick={handleOnClickPing}
          style={{
            padding: "5px 25px",
            cursor: "pointer",
            borderRadius: ".25rem",
            border: "none",
            outline: "none",
            backgroundColor: "#0d6efd",
            transition: "0.5s",
            color: "#fff",
            fontWeight: "bolder",
          }}
        >
          Ping
        </button>
        <button
          className="discoverButton"
          onClick={handleOnClickDiscover}
          style={{
            padding: "5px 25px",
            cursor: "pointer",
            borderRadius: ".25rem",
            border: "none",
            outline: "none",
            backgroundColor: "#0d6efd",
            color: "#fff",
            fontWeight: "bolder",
          }}
        >
          Discover
        </button>
      </Box>
    </Box>
  );
}
