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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { black, yellow } from "../../constants/color";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducres/misc";
import UserItem from "../shared/UserItem";
import { useAsyncMutation } from "../../hooks/hooks";

const Search = () => {
  const dispatch = useDispatch();

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Friend request sentss", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
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
