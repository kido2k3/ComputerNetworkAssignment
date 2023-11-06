import { Box } from "@mui/material";
import React from "react";

export default function Terminal() {
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
          height: "100%",
          width: "100%",
          backgroundColor: "black",
          marginBottom: "20px",
        }}
      ></Box>
      <Box sx={{ height: "50px" }}>
        {" "}
        <input
          placeholder="Enter to run command"
          style={{ width: "100%", boxSizing: "border-box", padding: "10px" }}
        />
      </Box>
    </Box>
  );
}
