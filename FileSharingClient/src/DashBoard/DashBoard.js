import { Box, Typography } from "@mui/material";
import React from "react";
import Participants from "../Participants/Participants";
import MainDashBoard from "../MainDashBoard/MainDashBoard";

export default function DashBoard() {
  return (
    <Box sx={{ padding: "40px 0px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "30px", fontWeight: "bolder" }}>
          FILE-SHARING WEBSITE
        </Typography>
        <Participants />
      </Box>
      <MainDashBoard />
    </Box>
  );
}
