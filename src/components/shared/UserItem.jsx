import { Add as AddIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { yellow } from "../../constants/color";

const UserItem = ({ user, handler, handlerIsLoading }) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem
      sx={{
        margin: "0",
        padding: ".5rem 0rem",
        // width: "100%",
      }}
    >
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
            color: "white",
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={{
            // bgcolor: purple,
            color: yellow,
            "&:hover": {
              bgcolor: "secondary.main",
              color: "white",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
