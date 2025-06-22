import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  Avatar,
  Dialog,
  DialogTitle,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { black, yellow } from "../../constants/color";
import { useErrors } from "../../hooks/hooks";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducres/misc";

const Notification = () => {
  const dispatch = useDispatch();

  const { isNotification } = useSelector((state) => state.misc);

  const { data, isLoading, isError, error } = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));

    try {
      const res = await acceptRequest({
        requestId: _id,
        accept,
      });

      if (res.data?.success) {
        console.log("use socket here");
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: ".4rem" }}
        sx={{ backgroundColor: black, color: "white" }}
        maxWidth={"25rem"}
      >
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests.map(({ sender, _id }) => (
                <NotificationItem
                  key={_id}
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                />
              ))
            ) : (
              <Typography textAlign={"center"} color="red">
                No notifications
              </Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />

        <Typography
          variant="body2"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Tooltip title="Accept" placement="top">
            <IconButton onClick={() => handler({ _id, accept: true })}>
              <DoneIcon sx={{ color: yellow }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reject" placement="top">
            <IconButton
              color="error"
              onClick={() => handler({ _id, accept: false })}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notification;
