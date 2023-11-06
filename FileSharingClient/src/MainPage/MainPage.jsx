import { Box } from "@mui/material";
import React from "react";
import Header from "../Header/Header";
import DashBoard from "../DashBoard/DashBoard";

export default function MainPage() {
  return (
    <Box
      sx={{
        flexGrow: "1",
        height: "100%",
        boxSizing: "border-box",
        padding: "24px 40px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <DashBoard />
    </Box>
  );
}
