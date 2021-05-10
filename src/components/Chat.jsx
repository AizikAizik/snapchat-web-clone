import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import ReactTimeago from 'react-timeago'
import React from "react";
import "./chat.css";

const Chat = ({ id, timeStamp, read, userName, imageUrl, profilePic }) => {
  return (
    <div className="chat">
      <Avatar src={profilePic} className="chat__avatar" />
      <div className="chat__info">
        <h4>{userName}</h4>
        <p>Tap to view - <ReactTimeago date={new Date(timeStamp?.toDate()).toUTCString()} /></p>
      </div>

      {!read && <StopRounded className='chat__readIcon' />}
    </div>
  );
};

export default Chat;
