import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SharedFile() {
  const { username } = useSelector((state) => state.AuthReducer);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/sharedfiles/" + username)
      .then((res) => res.json())
      .then((data) => {
        setList(data.result);
      });
  }, [username]);
  return (
    <Box
      sx={{
        width: "70%",
        boxSizing: "border-box",
        padding: "10px 20px 20px 0px",
        height: "600px",
      }}
    >
      <table
        style={{
          width: "100%",
        }}
      >
        <tr>
          <th style={{ textAlign: "start", padding: "15px 0px" }}>Number</th>
          <th style={{ textAlign: "start", padding: "15px 0px" }}>
            Local Name
          </th>
          <th style={{ textAlign: "start", padding: "15px 0px" }}>Shared By</th>
        </tr>
        {list?.map((item, index) => {
          return (
            <tr key={index}>
              <td style={{ padding: "15px 0px", width: "200px" }}>
                {index + 1}
              </td>
              <td style={{ padding: "15px 0px", width: "200px" }}>
                {item?.fname}
              </td>
              <td style={{ padding: "15px 0px" }}>{item?.sender}</td>
            </tr>
          );
        })}
      </table>
    </Box>
  );
}
