import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { black } from "../../constants/color";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const groupName = useInputValidation("");

  const selectMemberHabdler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  console.log(selectedMembers);

  const submitHandler = () => {};

  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        sx={{ backgroundColor: black, color: "white" }}
        p={{ xs: "1rem", sm: "1rem" }}
        spacing={"1rem"}
        width={"25rem"}
      >
        <DialogTitle textAlign={"center"}>New Group</DialogTitle>

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
          label="Group Name"
          variant="outlined"
          size="small"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography>Members</Typography>

        <Stack>
          {members.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHabdler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button
            variant="outlined"
            color="error"
            size="medium"
            onClick={closeHandler}
          >
            Cancel
          </Button>

          <Button
            color="secondary"
            variant="outlined"
            size="medium"
            onClick={submitHandler}
            // disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
