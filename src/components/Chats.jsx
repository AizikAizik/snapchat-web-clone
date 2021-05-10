import { Avatar } from "@material-ui/core";
import { ChatBubbleSharp, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Chat from "./Chat";
import "./chats.css";

const Chats = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
        <div className="chats__search">
          <Search />
          <input type="text" placeholder="friends" />
        </div>
        <ChatBubbleSharp className="chats__chatIcon" />
      </div>

      <div className="chats__post">
        {posts.map(({ id, data: { imageUrl, userName, read, timeStamp, profilePic } }) => {
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
        })}
      </div>
    </div>
  );
};

export default Chats;
