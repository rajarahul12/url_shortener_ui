import React, { useState } from "react";
import AttachmentIcon from "@material-ui/icons/Attachment";
import SendIcon from "@material-ui/icons/Send";
import { Button, CircularProgress } from "@material-ui/core";

import "./InputForm.css";
import axios from "./axios";
import TransitionsModal from "./Modal";

function InputForm() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleURLChange = (e) => {
    setShortURL("");
    setLongURL(e.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ longUrl: longURL });

    var config = {
      method: "post",
      url: "/api/url/shorten",
      headers: {
        "Content-Type": "application/json",
      },
      data: raw,
    };

    axios(config)
      .then(function (response) {
        setShortURL(response.data.shortUrl);
        setShowModal(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="inputform">
      <TransitionsModal
        open={showModal}
        shortURL={shortURL}
        handleModalClose={handleModalClose}
      />
      <form className="inputform__userInput">
        <div className="inputform__longurl">
          <AttachmentIcon />
          <input
            value={longURL}
            onChange={handleURLChange}
            placeholder="Shorten your link"
            type="text"
          />
        </div>

        <Button
          size="medium"
          endIcon={<SendIcon />}
          onClick={handleClick}
          variant="contained"
          color="primary"
          type="submit"
        >
          Shorten
        </Button>
        {/* <CircularProgress color="primary" size={30} /> */}
      </form>

      <div className="inputform__shorturl">
        <AttachmentIcon />
        <input value={shortURL} placeholder="Short link" type="text" />
      </div>
    </div>
  );
}

export default InputForm;
