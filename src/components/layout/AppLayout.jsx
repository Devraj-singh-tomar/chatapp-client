import { Drawer, Grid2, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { black } from "../../constants/color";
import { useErrors } from "../../hooks/hooks";
import { useMyChatsQuery } from "../../redux/api/api";
import { setIsMobile } from "../../redux/reducres/misc";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { chatId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isMobile } = useSelector((state) => state.misc);

    const { data, isLoading, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("delete chat", _id, groupChat);
    };

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    return (
      <>
        <Title />

        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <Grid2 container height={"calc(100vh - 4rem)"}>
          <Grid2
            size={{ sm: 4, md: 3 }}
            height={"100%"}
            bgcolor={black}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
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
            bgcolor={black}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
            }}
          >
            <Profile />
          </Grid2>
        </Grid2>
      </>
    );
  };
};

export default AppLayout;
