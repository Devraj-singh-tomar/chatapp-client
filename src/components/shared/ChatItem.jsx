import { memo } from "react";
import { Link } from "../styles/StyledComponent";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { yellow } from "../../constants/color";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: 0 }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          alignItems: "center",
          borderRadius: "10px",
          padding: "1rem",
          backgroundColor: sameSender ? "rgba(0, 0, 0, 0.2)" : "unset",
          color: "white",
          position: "relative",
        }}
      >
        {/* AVATAR CARD */}
        <AvatarCard avatar={avatar} />

        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Typography variant="body2">{name}</Typography>

          {newMessageAlert && (
            <Tooltip
              placement="top"
              title={`${newMessageAlert?.count} new message`}
            >
              <Typography color={yellow} variant="caption">
                ({newMessageAlert.count})
              </Typography>
            </Tooltip>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#17B",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
