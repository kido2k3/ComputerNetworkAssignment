import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ContentDiscoverTerminal({ files, hostname }) {
  return (
    <Box style={{ color: "#fff" }}>
      {files === "user not found" ? (
        <Typography>User not found</Typography>
      ) : (
        <>
          <Typography sx={{ textAlign: "center", marginBottom: "20px" }}>
            THE LIST OF LOCAL FILES OF {hostname}
          </Typography>
          {files?.length > 0 ? (
            <ul>
              {files?.map((item) => {
                return (
                  <li style={{ color: "#fff", marginTop: "5px" }}>
                    + {item?.lname}
                  </li>
                );
              })}
            </ul>
          ) : (
            <Typography>No data to show</Typography>
          )}
        </>
      )}
    </Box>
  );
}
