import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid2,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
import { black, yellow } from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks.js/admin";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 10px;
  padding: 1rem 1rem;
  color: white;
  &:hover {
    background-color: black;
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon sx={{ color: yellow }} />,
  },
  {
    name: "User",
    path: "/admin/users",
    icon: <PersonIcon sx={{ color: yellow }} />,
  },
  {
    name: "Chat",
    path: "/admin/chats",
    icon: <GroupIcon sx={{ color: yellow }} />,
  },
  {
    name: "Message",
    path: "/admin/messages",
    icon: <MessageIcon sx={{ color: yellow }} />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(adminLogout());
  };

  return (
    <Stack direction={"column"} p={"2rem"} width={w} spacing={"2rem"}>
      <Typography
        variant="h5"
        textAlign={"center"}
        textTransform={"uppercase"}
        color={yellow}
      >
        CHATTERLY
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                backgroundColor: "black",
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <LogoutIcon sx={{ color: yellow }} />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);

  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) return <Navigate to={"/admin"} />;

  return (
    <Grid2 container color={"white"} bgcolor={black} minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: " 1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? (
            <CloseIcon sx={{ color: yellow }} />
          ) : (
            <MenuIcon sx={{ color: yellow }} />
          )}
        </IconButton>
      </Box>

      <Grid2
        size={{ md: 4, lg: 3 }}
        bgcolor={black}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar />
      </Grid2>

      <Grid2 size={{ xs: 12, md: 8, lg: 9 }} bgcolor={black}>
        {children}
      </Grid2>

      <Drawer
        open={isMobile}
        onClose={handleClose}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: black,
            color: "white",
            // paddingTop: "1rem",
          },
        }}
      >
        <Sidebar w="50vw" />
      </Drawer>
    </Grid2>
  );
};

export default AdminLayout;
