import { Box, Dialog } from "@mui/material";
import React from "react";

export default function LoadingEffect() {
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "hidden",
        },
      }}
      sx={{ backgroundColor: "none" }}
      open={true}
    >
      <Box className="loader"></Box>
    </Dialog>
  );
}
