import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid2 } from "@mui/material";
import ChatList from "../specific/ChatList";
import { black } from "../../constants/color";
import { samepleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { chatId } = useParams();

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("delete chat", _id, groupChat);
    };

    return (
      <>
        <Title />

        <Header />

        <Grid2 container height={"calc(100vh - 4rem)"}>
          <Grid2
            size={{ sm: 4, md: 3 }}
            height={"100%"}
            bgcolor={black}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <ChatList
              chats={samepleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid2>

          <Grid2
            size={{ xs: 12, sm: 8, md: 5, lg: 6 }}
            height={"100%"}
            bgcolor={"violet"}
          >
            <WrappedComponent {...props} />
          </Grid2>

          <Grid2
            size={{ md: 4, lg: 3 }}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "plum",
            }}
          >
            3
          </Grid2>
        </Grid2>
      </>
    );
  };
};

export default AppLayout;
