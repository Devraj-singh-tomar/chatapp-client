import { Grid2, Skeleton, Stack } from "@mui/material";

const LayoutLoader = () => {
  return (
    <Grid2 container spacing={"1rem"} height={"calc(100vh - 4rem)"}>
      <Grid2
        size={{ sm: 4, md: 3 }}
        height={"100%"}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height={"100%"}>
        <Stack spacing={"1rem"}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={"8vh"} />
          ))}
        </Stack>
      </Grid2>

      <Grid2
        size={{ md: 4, lg: 3 }}
        height={"100%"}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid2>
    </Grid2>
  );
};

export default LayoutLoader;
