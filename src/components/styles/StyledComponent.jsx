import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { black } from "../../constants/color";

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  margin: 0rem 0.5rem;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: 1px solid rgb(55, 53, 53);
  outline: none;
  color: white;
  padding: 0 1rem;
  border-radius: 10px;
  background-color: ${black};
`;

export { VisuallyHiddenInput, Link, InputBox };
