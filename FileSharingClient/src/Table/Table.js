import { Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateListFile,
  updatePeerConnection,
} from "../Redux/Reducer/AuthReducer";
import {
  getMimeTypeFromArrayBuffer,
  randomString,
} from "../service/handleFetchData";

export default function Table() {
  const [open, setOpen] = useState(false);
  const [fname, setFName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [peername, setPeerName] = useState("");
  const [file, setFile] = useState(null);
  const { username, newPeer, connection, listFile } = useSelector(
    (state) => state.AuthReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setFName("");
    setFile("");
  }, [open]);
  useEffect(() => {
    fetch(`http://192.168.137.1:3000/userfiles/${username}`)
      .then((res) => res.json())
      .then((data) => setTableData(data.result));
  }, [username]);

  const handleOnClickUpLoad = () => {
    if (username !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          fname: fname,
          lname: file?.name,
        }),
      };
      fetch("http://192.168.137.1:3000/file", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          fetch(`http://192.168.137.1:3000/userfiles/${username}`)
            .then((res) => res.json())
            .then((data) => {
              setTableData(data.result);
              setOpen(false);
            });
        });
      dispatch(updateListFile(file));
    }
  };
  const checkDisableUpload = () => {
    if (file && fname !== "" && username !== "") {
      return false;
    } else {
      return true;
    }
  };
  const handleOnClickConnect = () => {
    dispatch(updatePeerConnection(newPeer.connect(peername)));
  };
  const handleonclickSend = (index) => {
    connection.send(listFile[index]);
  };
  useEffect(() => {
    newPeer.on("connection", (link) => {
      link.on("data", async (data) => {
        console.log("Running!!!");
        const str = randomString(5);
        let url = window.URL.createObjectURL(new Blob([data]));
        let a = document.createElement("a");
        a.href = url;
        a.download = `${str}.${getMimeTypeFromArrayBuffer(data).slice(
          getMimeTypeFromArrayBuffer(data).indexOf("/") + 1
        )}`;
        a.click();
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            fname: `${str}.${getMimeTypeFromArrayBuffer(data).slice(
              getMimeTypeFromArrayBuffer(data).indexOf("/") + 1
            )}`,
            sender: link?.peer,
          }),
        };
        fetch("http://192.168.137.1:3000/sharedFile", requestOptions).then(
          (res) => res.json()
        );
      });
    });
  }, [newPeer, username]);
  console.log("Peer Name: ", peername);
  return (
    <Box
      sx={{
        width: "70%",
        boxSizing: "border-box",
        padding: "10px 20px 20px 0px",
        height: "600px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => {
            setOpen(true);
          }}
          style={{
            padding: "10px 40px",
            border: "none",
            outline: "none",
            backgroundColor: "#0061d5",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "bolder",
          }}
        >
          Upload +
        </button>
      </Box>
      <input
        value={peername}
        onChange={(e) => {
          setPeerName(e.target.value);
        }}
        placeholder="Enter your friend's name"
        style={{
          backgroundColor: "#f0f0f0",
          border: "none",
          outline: "none",
          width: "500px",
          boxSizing: "border-box",
          paddingBottom: "1px",
          padding: "10px",
          marginRight: "10px",
        }}
      />
      <button
        onClick={handleOnClickConnect}
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "#ffc107",
          padding: "10px 20px",
          borderRadius: "5px",
          color: "black",
          cursor: "pointer",
        }}
      >
        Connect
      </button>
      <Box sx={{ marginTop: "20px" }}>
        {" "}
        <table
          style={{
            width: "100%",
          }}
        >
          <tr>
            <th style={{ textAlign: "start", padding: "15px 0px" }}>FName</th>
            <th style={{ textAlign: "start", padding: "15px 0px" }}>LName</th>
            <th style={{ textAlign: "start", padding: "15px 0px" }}>
              Uploaded By
            </th>
            <th style={{ textAlign: "start", padding: "15px 0px" }}>Actions</th>
          </tr>
          {tableData?.map((item, index) => {
            return (
              <tr key={index}>
                <td style={{ padding: "15px 0px", width: "200px" }}>
                  {item?.fname.length > 25
                    ? item?.fname.slice(0, 25) + " ..."
                    : item.fname}
                </td>
                <td style={{ padding: "15px 0px", width: "200px" }}>
                  {item?.lname.length > 25
                    ? item?.lname.slice(0, 12) + " ..."
                    : item.lname}
                </td>
                <td style={{ padding: "15px 0px" }}>{username}</td>
                <td
                  style={{
                    padding: "15px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => handleonclickSend(index)}
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "#28a745",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      color:
                        item?.username === username || username === ""
                          ? "rgba(0, 0, 0, 0.26)"
                          : "#ffff",
                      cursor:
                        item?.username === username || username === ""
                          ? "normal"
                          : "pointer",
                    }}
                  >
                    Send
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffff",
            width: "600px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "20px 20px",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <i
              onClick={() => {
                setOpen(false);
              }}
              style={{ cursor: "pointer" }}
              className="fa-solid fa-x"
            ></i>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <input
              value={file?.name}
              disabled
              placeholder="Enter local name"
              style={{ padding: "10px", boxSizing: "border-box" }}
            />
            <input
              value={fname}
              onChange={(e) => {
                setFName(e.target.value);
              }}
              placeholder="Enter fName"
              style={{
                padding: "10px",
                boxSizing: "border-box",
                marginTop: "20px",
              }}
            />
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              width: "100%",
              height: "300px",
              border: "1px dashed black",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <i
              className="fa-solid fa-cloud-arrow-up"
              style={{
                color: "#5a84ce",
                fontSize: "80px",
                marginBottom: "10px",
              }}
            ></i>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              type="file"
            />
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={handleOnClickUpLoad}
              style={{
                padding: "10px 40px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                color: checkDisableUpload() ? "rgba(0, 0, 0, 0.26)" : "#fff",
                backgroundColor: checkDisableUpload()
                  ? "rgba(0, 0, 0, 0.12)"
                  : "rgb(0, 97, 213)",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
              }}
              disabled={checkDisableUpload()}
            >
              Upload
            </button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
