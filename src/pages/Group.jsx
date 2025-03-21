import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspaceOutlined as KeyboardBackspaceOutlinedIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Button,
  Drawer,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { black, yellow } from "../constants/color";
import { memo, useEffect, useState } from "react";
import { Link } from "../components/styles/StyledComponent";
import AvatarCard from "../components/shared/AvatarCard";
import { samepleChats } from "../constants/sampleData";

const Group = () => {
  const chatId = useSearchParams()[0].get("group");

  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState();
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupNameHandler = () => {
    setIsEdit(false);
    console.log("updated group name");
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {};

  useEffect(() => {
    setGroupName("Group Name");
    setGroupNameUpdatedValue("Group Name");

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

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

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField
            sx={{
              input: { color: "white" }, // Change text color inside input
              "& .MuiInputLabel-root": { color: "#f9d423" }, // Change label color
              "& .MuiInputLabel-root.Mui-focused": { color: "#f9d423" }, // Label when clicked
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" }, // Default border
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                }, // Hover border
                "&.Mui-focused fieldset": { borderColor: "#f9d423" }, // Focus border
              },
            }}
            label="Enter group name"
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />

          <IconButton sx={{ color: yellow }} onClick={updateGroupNameHandler}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h5">{groupName}</Typography>
          <IconButton sx={{ color: yellow }} onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        variant="outlined"
        size="medium"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>

      <Button
        variant="contained"
        size="medium"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
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

        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* MEMBERS */}
            </Stack>

            {ButtonGroup}
          </>
        )}
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
