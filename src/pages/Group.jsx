import {
  KeyboardBackspaceOutlined as KeyboardBackspaceOutlinedIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Drawer,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { black, yellow } from "../constants/color";
import { memo, useState } from "react";
import { Link } from "../components/styles/StyledComponent";
import AvatarCard from "../components/shared/AvatarCard";
import { samepleChats } from "../constants/sampleData";

const Group = () => {
  const chatId = useSearchParams()[0].get("group");

  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const IconBtns = (
    <>
      <Tooltip title="menu">
        <IconButton
          onClick={handleMobile}
          sx={{
            display: { xs: "block", sm: "none" },
            position: "fixed",
            right: "1rem",
            top: "1rem",
            color: yellow,
          }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="back">
        <IconButton
          sx={{
            color: yellow,
            position: "absolute",
            top: ".5rem",
            left: ".5rem",
            bgcolor: "",
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceOutlinedIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Grid2
      container
      height={"100%"}
      minHeight={"100vh"}
      bgcolor={black}
      color={"white"}
    >
      <Grid2
        // bgcolor={"yellowgreen"}
        size={{ sm: 4 }}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Typography variant="h5" padding={1.2} textAlign={"center"}>
          Your Groups
        </Typography>
        <GroupsList chatId={chatId} myGroups={samepleChats} />
      </Grid2>

      <Grid2
        size={{ xs: 12, sm: 8 }}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
      </Grid2>

      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },

          "& .MuiDrawer-paper": {
            backgroundColor: black,
            paddingTop: "1rem",
            color: "white",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList w={"50vw"} chatId={chatId} myGroups={samepleChats} />
      </Drawer>
    </Grid2>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem key={group._id} group={group} chatId={chatId} />
        ))
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />

        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
