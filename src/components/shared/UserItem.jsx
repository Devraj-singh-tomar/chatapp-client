import { Add as AddIcon } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Avatar,
  IconButton,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { yellow } from "../../constants/color";

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false }) => {
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
              bgcolor: isAdded ? "error.main" : "secondary.main",
              color: "white",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? (
            <Tooltip placement="top" title="Remove">
              <RemoveIcon />
            </Tooltip>
          ) : (
            <Tooltip placement="top" title="Add">
              <AddIcon />
            </Tooltip>
          )}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
