import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { black } from "../../constants/color";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: black, // Change to any color you want
        },
      }}
    >
      <DialogTitle color="red">Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText color="white">
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="error" variant="contained" onClick={deleteHandler}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
