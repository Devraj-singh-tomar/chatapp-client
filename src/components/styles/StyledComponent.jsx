import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

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

export { VisuallyHiddenInput, Link };
