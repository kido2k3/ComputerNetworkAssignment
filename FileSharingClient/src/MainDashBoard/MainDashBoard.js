import { Box } from "@mui/material";
import React from "react";
import Table from "../Table/Table";
import Terminal from "../Terminal/Terminal";
import { useSelector } from "react-redux";
import SharedFile from "../SharedFile/SharedFile";

export default function MainDashBoard() {
  const { isTab } = useSelector((state) => state.LoadingReducer);

  return (
    <Box sx={{ display: "flex", padding: "30px 0px" }}>
      {isTab ? <Table /> : <SharedFile />}
      <Terminal />
    </Box>
  );
}
