import { Box, Dialog, Typography } from "@mui/material";
import Peer from "peerjs";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { updateUserInfo, updateUserPeer } from "../Redux/Reducer/AuthReducer";
export default function Header() {
  const { username, peerID } = useSelector((state) => state.AuthReducer);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const handleOnClickSignIn = () => {
    if (userName !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, peerID: userName }),
      };
      fetch("http://localhost:3000/user", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          dispatch(
            updateUserInfo({
              username: data.name,
              peerID: data.peerID,
            })
          );
          dispatch(updateUserPeer(new Peer(data.name, { key: "myapikey" })));
          setOpen(false);
        });
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px 0px 0px 5px",
            boxSizing: "border-box",
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </Box>
        <Box
          sx={{
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "0px 5px 5px 0px",
            boxSizing: "border-box",
          }}
        >
          <input
            placeholder="Search files and folders"
            style={{
              backgroundColor: "#f0f0f0",
              border: "none",
              outline: "none",
              width: "500px",
              boxSizing: "border-box",
              paddingBottom: "1px",
            }}
          />{" "}
        </Box>
      </Box>
      <Box
        display={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "350px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            border: "none",
            outline: "none",
            borderRadius: "5px",
            color: "#ffff",
            backgroundColor: "#392F6B",
          }}
        >
          Unlock more storage
        </button>
        <i style={{ color: "#777777" }} className="fa-solid fa-circle-info"></i>
        <i style={{ color: "#777777" }} className="fa-solid fa-paperclip"></i>
        <i style={{ color: "#777777" }} className="fa-solid fa-bell"></i>
        {username !== "" && peerID !== "" ? (
          <i
            style={{ fontSize: "40px", color: "rgb(244, 194, 42)" }}
            className="fa-solid fa-circle-user"
          ></i>
        ) : (
          <button
            onClick={() => {
              setOpen(true);
            }}
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "rgb(222 76 76)",
              padding: "10px 20px",
              borderRadius: "5px",
              color: "#ffff",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Sign In
          </button>
        )}
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {" "}
        <Box
          sx={{
            backgroundColor: "#ffff",
            width: "600px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "20px 20px",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <i
              onClick={() => {
                setOpen(false);
              }}
              style={{ cursor: "pointer" }}
              className="fa-solid fa-x"
            ></i>
          </Box>
          <Typography
            sx={{ textAlign: "center", fontSize: "30px", fontWeight: "700" }}
          >
            LOG IN
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Enter username"
              style={{ padding: "10px", boxSizing: "border-box" }}
            />
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={handleOnClickSignIn}
              style={{
                padding: "10px 40px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                color: "#fff",
                backgroundColor: "rgb(0, 97, 213)",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
