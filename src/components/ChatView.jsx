import React, { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectCameraImage } from "../features/appSlice";
import "./chatview.css";

function ChatView() {
  const selectedImage = useSelector(selectCameraImage);
  const history = useHistory();

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    history.replace("/chats");
  };

  return (
    <div className="chatview" onClick={exit}>
      <img src={selectedImage} alt="select pic" />
      <div className="chatview__timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#f7b801", 0.33],
            ["#a30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default ChatView;
