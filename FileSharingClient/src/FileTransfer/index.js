import Peer from "peerjs";
import React, { useEffect, useState } from "react";
import { Dialog, Box, Typography } from "@mui/material";
import { getMimeTypeFromArrayBuffer } from "../service/handleFetchData";
export default function FileTransfer() {
  let peer = new Peer();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [peerName, setPeerName] = useState("");
  const [message, setMessage] = useState("");
  const [newPeer, setNewPeer] = useState(peer);
  const [fileType, setFileType] = useState("");
  const [connection, setConnection] = useState(peer.connect(undefined));
  const [receivedData, setReceivedData] = useState([]);
  const handleOnClickSave = () => {
    setNewPeer(new Peer(name, { key: "myapikey" }));
    setOpen(false);
  };

  const handleOnClickCall = () => {
    setConnection(newPeer.connect(peerName));
  };
  useEffect(() => {
    newPeer.on("connection", (connection) => {
      connection.on("data", async (data) => {
        let url = window.URL.createObjectURL(new Blob([data]));
        let a = document.createElement("a");
        a.href = url;
        a.download = `abc.${getMimeTypeFromArrayBuffer(data).slice(
          getMimeTypeFromArrayBuffer(data).indexOf("/") + 1
        )}`;
        a.click();
      });
    });
  }, [newPeer, fileType]);

  function gotPhoto(element) {
    var file = element;
    var reader = new FileReader();
    reader.onload = function (base64) {
      localStorage["file"] = reader.result;
    };
    reader.readAsDataURL(file);
  }
  function getPhoto() {
    var base64 = localStorage["file"];
    var base64Parts = base64.split(",");
    var fileFormat = base64Parts[0].split(";")[1];
    var fileContent = base64Parts[1];
    var file = new File([fileContent], "file name here", { type: fileFormat });
    return file;
  }
  const handleOnClickSend = () => {
    // connection.send(getPhoto());
    console.log(getPhoto());
    console.log(message[0]);
  };
  return (
    <>
      {name !== "" && !open && <Typography>Hello, it's {name}</Typography>}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>Enter your name:</p>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button onClick={handleOnClickSave}>Save</button>
        </Box>
      </Dialog>
      <Box>
        <p>Name to call: </p>
        <input
          onChange={(e) => {
            setPeerName(e.target.value);
          }}
        />
        <button onClick={handleOnClickCall}>Call</button> <br />
        <input
          onChange={(e) => {
            setMessage(e.target.files);
            gotPhoto(e.target.files[0]);
          }}
          type="file"
        />
        <Box>
          <p>Shared with me</p>
        </Box>
        <button onClick={handleOnClickSend}>Send</button>
      </Box>
    </>
  );
}
