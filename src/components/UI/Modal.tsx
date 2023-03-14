import React, { JSXElementConstructor, ReactElement } from "react";
import { Modal as MuiModal } from "@mui/material";

export default function Modal(props: {
  open: boolean;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  handleClose: () => void;
}) {
  return (
    <MuiModal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>{props.children}</div>
    </MuiModal>
  );
}
