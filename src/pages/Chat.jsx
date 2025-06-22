import {
  AttachFileOutlined as AttachFileOutlinedIcon,
  SendOutlined as SendOutlinedIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponent";
import { blue } from "../constants/color";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hooks";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { getSocket } from "../socket";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducres/misc";
import { removeNewMessagesAlert } from "../redux/reducres/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const bottomRef = useRef(null);

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

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

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

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatDetatils.data?.chat) return navigate("/");
  }, [chatDetatils.data]);

  const newMessagesListener = useCallback(
    (data) => {
      // console.log(data);
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      console.log("start typing", data);

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      console.log("stop typing", data);

      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (content) => {
      const messageForAlert = {
        content,
        sender: {
          _id: "oinoniononqnwoinodnq",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventsHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

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

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
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
            onChange={messageOnChange}
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
