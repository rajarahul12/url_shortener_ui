import React, { useEffect, useState } from "react";
import AttachmentIcon from "@material-ui/icons/Attachment";
import MouseIcon from "@material-ui/icons/Mouse";

import axios from "./axios";
import "./Info.css";
import { useCountUp } from "react-countup";

function Info() {
  const { countUp, update } = useCountUp({
    start: 0,
    end: 0,
    delay: 0,
    duration: 2,
  });

  var count = useCountUp({ start: 0, end: 0, delay: 0, duration: 2 });
  var counter = count.countUp;
  var counterUpdater = count.update;

  useEffect(() => {
    var config = {
      method: "get",
      url: "/urlinfo",
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        update(response.data.urlHits);
        counterUpdater(response.data.urlsCreated);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="info">
      <div className="info__section">
        <AttachmentIcon className="info__sectionIcon" />
        <div className="info__sectionDesc">
          <p>URLS CREATED</p>
          <h3>{counter}</h3>
        </div>
      </div>
      <div className="info__section">
        <MouseIcon className="info__sectionIcon" />
        <div className="info__sectionDesc">
          <p>CLICKS SERVED</p>
          <h3>{countUp}</h3>
        </div>
      </div>
    </div>
  );
}

export default Info;
