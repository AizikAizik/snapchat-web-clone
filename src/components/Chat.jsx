import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import ReactTimeago from "react-timeago";
import React from "react";
import "./chat.css";
import { useDispatch } from "react-redux";
import { selectImage } from "../features/appSlice";
import { db } from "../firebase";
import { useHistory } from "react-router";

const Chat = ({ id, timeStamp, read, userName, imageUrl, profilePic }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));

      db.collection("posts").doc(id).set({ read: true }, { merge: true });

      history.push('/chats/view')
    }else{
      dispatch(selectImage(imageUrl));
      history.push('/chats/view');

    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar src={profilePic} className="chat__avatar" />
      <div className="chat__info">
        <h4>{userName}</h4>
        <p>
          {!read && 'Tap to view-'} {" "}
          <ReactTimeago date={new Date(timeStamp?.toDate()).toUTCString()} />
        </p>
      </div>

      {!read && <StopRounded className="chat__readIcon" />}
    </div>
  );
};

export default Chat;
