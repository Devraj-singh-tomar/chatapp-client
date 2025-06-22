import { useFetchData } from "6pp";
import {
  AdminPanelSettingsOutlined,
  Group as GroupIcon,
  Message as MessageIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponent";
import { black, yellow } from "../../constants/color";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hooks";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );

  const { stats } = data || {};

  useErrors([{ isError: error, error: error }]);

  const Appbar = (
    <Paper
      sx={{
        backgroundColor: black,
        color: "white",
        padding: "1.2rem",
        margin: "1rem 0",
        borderRadius: "10px",
      }}
      elevation={4}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsOutlined />

        <SearchField placeholder="search.." type="text" />

        <CurveButton>Search</CurveButton>

        <Box flexGrow={1} />

        {/* <Typography>{moment().format("MMMM Do YYYY")}</Typography> */}
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title="Users" value={stats?.usersCount} Icon={<PersonIcon />} />
      <Widget
        title="Chats"
        value={stats?.totalChatsCount}
        Icon={<GroupIcon />}
      />
      <Widget
        title="Messages"
        value={stats?.messagesCount}
        Icon={<MessageIcon />}
      />
    </Stack>
  );

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Container component={"main"}>
          {Appbar}

          <Stack
            direction={{ xs: "column", lg: "row" }}
            // spacing={"2rem"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{ xs: "center", lg: "stretch" }}
            sx={{ gap: "1.5rem" }}
          >
            <Paper
              elevation={4}
              sx={{
                backgroundColor: black,
                color: "white",
                padding: "2rem 3.5rem",
                borderRadius: "10px",
                width: "100%",
                maxWidth: "35rem",
                // height: "25rem",
              }}
            >
              <Typography margin={"2rem 0"} variant="h6">
                Last Messages
              </Typography>

              <LineChart value={stats?.messagesChart || []} />
            </Paper>

            <Paper
              elevation={4}
              sx={{
                backgroundColor: black,
                color: "white",
                padding: "1rem",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", sm: "50%" },
                position: "relative",
                width: "100%",
                maxWidth: "20rem",
                // height: "25rem",
              }}
            >
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}
              />

              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon sx={{ color: yellow }} />
                <Typography>VS</Typography>
                <PersonIcon sx={{ color: yellow }} />
              </Stack>
            </Paper>
          </Stack>

          {Widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={4}
    sx={{
      backgroundColor: black,
      color: "white",
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "10px",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        color="white"
        borderRadius={"50%"}
        border={"4px solid rgba(0,0,0,0.9)"}
        width={"5rem"}
        height={"5rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {value}
      </Typography>

      <Stack sx={{ color: yellow }}>{Icon}</Stack>

      <Typography>{title}</Typography>
    </Stack>
  </Paper>
);

export default Dashboard;
