import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIsTab } from "../Redux/Reducer/LoadingReducer";

export default function SideBar() {
  const { isTab } = useSelector((state) => state.LoadingReducer);
  const { username } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#0061d5",
        color: "#ffff",
        boxSizing: "border-box",
        padding: "20px 30px",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "20px" }}
      >
        CN'S AMATEUR
      </Typography>
      <Box
        onClick={() => {
          dispatch(updateIsTab(true));
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          backgroundColor: isTab ? "#034a9e" : "none",
          padding: "7px 20px",
          boxSizing: "border-box",
          width: "100%",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <i className="fa-solid fa-file"></i>
        <Typography sx={{ marginLeft: "10px", fontSize: "13px" }}>
          All Files
        </Typography>
      </Box>
      <Box
        onClick={() => {
          if (username !== "") {
            dispatch(updateIsTab(false));
          }
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          padding: "7px 20px",
          boxSizing: "border-box",
          width: "100%",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: !isTab ? "#034a9e" : "none",
        }}
      >
        <i className="fa-regular fa-share-from-square"></i>
        <Typography sx={{ marginLeft: "10px", fontSize: "13px" }}>
          Shared Files
        </Typography>
      </Box>
    </Box>
  );
}
