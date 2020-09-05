import React, { useState } from "react";
import { SearchOutlined } from "@material-ui/icons";

import "./InputForm.css";

function InputForm() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleURLChange = (e) => {
    setLongURL(e.target.value);
  };

  const handleClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ longUrl: longURL });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      mode: "cors",
    };

    fetch("http://localhost:5000/api/url/shorten", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setShortURL(result.shortUrl);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="inputform">
      <div className="inputform__userInput">
        <div className="inputform__longurl">
          <SearchOutlined />
          <input
            value={longURL}
            onChange={handleURLChange}
            placeholder="Shorten your link"
            type="text"
          />
        </div>

        <button onClick={handleClick}>Shorten</button>
      </div>
      <div className="inputform__shorturl">
        <input value={shortURL} placeholder="Short link" type="text" />
      </div>
    </div>
  );
}

export default InputForm;
