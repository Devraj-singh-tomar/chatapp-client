import React, { Fragment, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import {
  AttachFileOutlined as AttachFileOutlinedIcon,
  SendOutlined as SendOutlinedIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponent";
import { blue } from "../constants/color";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { sampleMessage } from "../constants/sampleData";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import { useChatDetailsQuery } from "../redux/api/api";

const user = {
  _id: "asdasdadW",
  name: "Devraj singh",
};

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);

  const socket = getSocket();

  const chatDetatils = useChatDetailsQuery({ chatId, skip: !chatId });

  // console.log(chatDetatils.data.chat.members);

  const [message, setMessage] = useState("");

  const members = chatDetatils?.data?.chat?.members;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // EMITTING MESSAGE TO THE SERVER ------------------------

    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage("");

    console.log(message);
  };

  return chatDetatils.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"90%"}
        // bgcolor={"violet"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* MESSAGES RENDer */}

        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          position={"relative"}
          alignItems={"center"}
          padding={".5rem .3rem"}
          gap={"5px"}
        >
          <IconButton
            sx={{
              padding: ".688rem",
              borderRadius: "10px",
              backgroundColor: blue,
              "&:hover": {
                backgroundColor: "rgb(14, 124, 228)",
              },
            }}
          >
            <AttachFileOutlinedIcon
              sx={{
                color: "black",
              }}
            />
          </IconButton>

          <InputBox
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />

          <IconButton
            type="submit"
            sx={{
              padding: ".688rem",
              borderRadius: "10px",
              backgroundColor: blue,
              "&:hover": {
                backgroundColor: "rgb(14, 124, 228)",
              },
            }}
          >
            <SendOutlinedIcon
              sx={{
                color: "black",
              }}
            />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </Fragment>
  );
};

export default AppLayout()(Chat);
