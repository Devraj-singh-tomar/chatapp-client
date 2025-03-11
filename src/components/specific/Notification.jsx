import React, { memo } from "react";
import {
  Avatar,
  Dialog,
  DialogTitle,
  IconButton,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { sampleNotifications } from "../../constants/sampleData";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { black, yellow } from "../../constants/color";

const Notification = () => {
  const friendRequestHandler = ({ _id, accept }) => {};

  return (
    <Dialog open>
      <Stack
        p={{ xs: "1rem", sm: ".4rem" }}
        sx={{ backgroundColor: black, color: "white" }}
        maxWidth={"25rem"}
      >
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>

        {sampleNotifications.length > 0 ? (
          sampleNotifications.map(({ sender, _id }) => (
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
