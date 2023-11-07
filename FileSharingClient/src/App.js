import React, { useEffect } from "react";
import SideBar from "./SideBar/SideBar";
import MainPage from "./MainPage/MainPage";
import "./App.css";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import LoadingEffect from "./LoadingEffect/LoadingEffect";
import FileTransfer from "./FileTransfer";

export default function App() {
  const { openLoading } = useSelector((state) => state.LoadingReducer);
  useEffect(() => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3000/allFile", requestOptions)
      .then((res) => res.json())
      .then((data) => {});
  }, []);
  useEffect(() => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3000/allSharedFile", requestOptions)
      .then((res) => res.json())
      .then((data) => {});
  }, []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <MainPage />
      </Box>
      {openLoading && <LoadingEffect />}
      {/* <FileTransfer /> */}
    </>
  );
}
