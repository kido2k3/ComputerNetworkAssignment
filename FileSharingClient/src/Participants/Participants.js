import { Avatar, AvatarGroup } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    fetch("http://192.168.137.1:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data?.result);
      });
  }, []);
  return (
    <AvatarGroup
      sx={{ fontSize: "14px" }}
      renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
      total={participants?.length}
    >
      {participants?.map((item, index) => {
        return (
          <Avatar
            key={index}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
        );
      })}
    </AvatarGroup>
  );
}
