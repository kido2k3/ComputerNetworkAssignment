import { Box, Typography } from "@mui/material";
import React from "react";

export default function ContentPing({ ping }) {
  console.log(ping);
  return (
    <Box style={{ color: "#fff" }}>
      {ping?.result === "user not found" ? (
        <Typography>User not found</Typography>
      ) : (
        <Box
          sx={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
        >
          The status of {ping?.username} is:{" "}
          <div
            style={{
              marginLeft: "10px",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: ping?.online ? "#09d609" : "red",
            }}
          ></div>
          {ping?.online ? (
            <Typography sx={{ marginLeft: "10px", color: "#09d609" }}>
              Online
            </Typography>
          ) : (
            <Typography sx={{ marginLeft: "10px", color: "red" }}>
              Offline
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
