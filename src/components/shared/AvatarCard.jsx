import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { transformImage } from "../..//lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
        }}
      >
        <Box>
          {avatar.map((i, index) => (
            <Avatar
              key={Math.round() * 100}
              src={transformImage(i)}
              alt={`Avatar ${index}`}
              sx={{
                width: "1.8rem",
                height: "1.8rem",
                // position: "absolute",
                // bottom: "-1.1rem",
                // left: {
                //   xs: `${0.5 + index}rem`,
                //   sm: `${index}rem`,
                // },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
