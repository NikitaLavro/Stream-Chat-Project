import React from "react";

//Stream-Chat
import {
  Chat,
  LoadingIndicator,
  ChannelList,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
} from "stream-chat-react";

//Context
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, streamChat } = useAuth();

  if (streamChat == null) return <LoadingIndicator></LoadingIndicator>;

  return (
    <Chat client={streamChat}>
      <ChannelList />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default Home;
