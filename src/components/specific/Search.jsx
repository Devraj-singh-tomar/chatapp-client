import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { black, yellow } from "../../constants/color";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";

const Search = () => {
  const search = useInputValidation("");

  let isLoadingSendFriendRequest = false;

  const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = (id) => {
    console.log(id);
  };

  return (
    <Dialog open>
      <Stack
        sx={{ backgroundColor: black }}
        p="1rem"
        direction={"column"}
        width={"25rem"}
      >
        <DialogTitle color="white" textAlign={"center"}>
          Search User's
        </DialogTitle>
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
          variant="outlined"
          size="small"
          value={search.value}
          onChange={search.changeHandler}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: yellow }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
