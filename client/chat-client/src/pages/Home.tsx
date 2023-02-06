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
import { useAuth, useLoggenInAuth } from "../context/AuthContext";

const Home = () => {
  const { user, streamChat } = useLoggenInAuth();

  if (streamChat == null) return <LoadingIndicator></LoadingIndicator>;

  return (
    <Chat client={streamChat}>
      <ChannelList filters={{ members: { $in: [user.id] } }} />
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
