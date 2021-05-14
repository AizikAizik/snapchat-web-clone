import { Avatar } from "@material-ui/core";
import { ChatBubbleSharp, RadioButtonUnchecked, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../features/appSlice";
import { resetCameraImage } from "../features/cameraSlice";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import "./chats.css";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const takeSnap = () =>{
    dispatch(resetCameraImage());
    history.push('/');
  }

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
          title="sign out"
        />
        <div className="chats__search">
          <Search className='chats__searchIcon' />
          <input type="text" placeholder="friends" />
        </div>
        <ChatBubbleSharp className="chats__chatIcon" />
      </div>

      <div className="chats__post">
        {posts.map(
          ({
            id,
            data: { imageUrl, userName, read, timeStamp, profilePic },
          }) => {
            return (
              <Chat
                key={id}
                id={id}
                imageUrl={imageUrl}
                userName={userName}
                timeStamp={timeStamp}
                read={read}
                profilePic={profilePic}
              />
            );
          }
        )}
      </div>

      <RadioButtonUnchecked className='chats__takePicIcon' fontSize='large' onClick={takeSnap} />
    </div>
  );
};

export default Chats;
