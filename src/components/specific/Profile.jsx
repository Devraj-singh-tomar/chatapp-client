import { Avatar, Stack, Typography } from "@mui/material";
import { yellow } from "../../constants/color";
import moment from "moment";

// ICON IMPORT's
import Person2Icon from "@mui/icons-material/Person2";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Profile = () => {
  return (
    <Stack spacing={"1.8rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 120,
          height: 120,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "1px solid white",
        }}
      />

      <ProfileCard
        heading={"Bio"}
        text={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, reprehenderit!"
        }
        Icon={
          <TextSnippetIcon
            sx={{
              fontSize: "1rem",
            }}
          />
        }
      />

      <ProfileCard
        heading={"Username"}
        text={"@devrajsingh123"}
        Icon={
          <AccountCircleIcon
            sx={{
              fontSize: "1rem",
            }}
          />
        }
      />

      <ProfileCard
        heading={"Name"}
        text={"Devraj singh tomar"}
        Icon={
          <Person2Icon
            sx={{
              fontSize: "1rem",
            }}
          />
        }
      />

      <ProfileCard
        heading={"Joined"}
        text={moment("2023-11-14T18:30:00.0002").fromNow()}
        Icon={
          <CalendarTodayIcon
            sx={{
              fontSize: "1rem",
            }}
          />
        }
      />
    </Stack>
  );
};

const ProfileCard = ({ heading, text, Icon }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    <Stack>
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={"5px"}
        alignItems={"center"}
        color={yellow}
        variant="body2"
      >
        {Icon && Icon}
        {heading}
      </Typography>

      <Typography variant="body2">{text}</Typography>
    </Stack>
  </Stack>
);

export default Profile;
