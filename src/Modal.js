import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CloseIcon from "@material-ui/icons/Close";

import "./Modal.css";
import { Button, IconButton } from "@material-ui/core";
const QRCode = require("qrcode.react");

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    padding: "10px 10px 40px 40px",
  },
}));

export default function TransitionsModal({ shortURL, open, handleModalClose }) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {/* Close ICON */}
          <div className="modal__closeIcon">
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Short URL + Copy  */}
          <div style={{ marginRight: "30px" }}>
            <div className="modal__copy">
              <p className="modal__url">{shortURL}</p>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(shortURL);
                }}
                size="small"
                endIcon={<FileCopyIcon />}
                variant="contained"
                color="primary"
              />
            </div>

            {/* QR Code */}
            <div className="modal__qr">
              <QRCode size={200} value={shortURL} />
            </div>

            {/* Open Link  */}
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
              onClick={() => {
                window.open(shortURL, "_blank");
              }}
            >
              Open URL
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
