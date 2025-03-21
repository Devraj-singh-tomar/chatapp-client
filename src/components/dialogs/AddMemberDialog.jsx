import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { black } from "../../constants/color";
import { useState } from "react";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  console.log(selectedMembers);

  const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([]);
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
  };

  return (
    <Dialog
      open
      onClose={closeHandler}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: black, // Change to any color you want
        },
      }}
    >
      <Stack spacing={"1rem"} width={"20rem"} p={"1rem"}>
        <DialogTitle alignSelf={"center"} color="white">
          Add Members
        </DialogTitle>

        <Stack>
          {members.length > 0 ? (
            members.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography color="white" textAlign={"center"}>
              No Friends
            </Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          spacing={1}
        >
          <Button variant="outlined" color="error" onClick={closeHandler}>
            cancel
          </Button>

          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            color="secondary"
            disabled={isLoadingAddMember}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
