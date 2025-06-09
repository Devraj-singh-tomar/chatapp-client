import {
  AttachFileOutlined as AttachFileOutlinedIcon,
  SendOutlined as SendOutlinedIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { Fragment, useCallback, useRef, useState } from "react";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponent";
import { blue } from "../constants/color";
import { NEW_MESSAGE } from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hooks";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { getSocket } from "../socket";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducres/misc";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const chatDetatils = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessageChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessageChunk?.data?.totalPages,
    page,
    setPage,
    oldMessageChunk?.data?.message
  );

  const errors = [
    { isError: chatDetatils.isError, error: chatDetatils.error },
    { isError: oldMessageChunk.isError, error: oldMessageChunk.error },
  ];

  // console.log(oldMessages);

  const members = chatDetatils?.data?.chat?.members;

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));

    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // EMITTING MESSAGE TO THE SERVER ------------------------

    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage("");
  };

  const newMessagesHandler = useCallback((data) => {
    // console.log(data);
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventsHandler = { [NEW_MESSAGE]: newMessagesHandler };

  useSocketEvents(socket, eventsHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  // const allMessages = [...oldMessageChunk.data.message, ...messages];

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

        {allMessages.map((i) => (
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
            onClick={handleFileOpen}
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

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
