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
  ChannelListMessengerProps,
  useChatContext,
} from "stream-chat-react";

//Context
import { useAuth, useLoggenInAuth } from "../context/AuthContext";

const Home = () => {
  const { user, streamChat } = useLoggenInAuth();

  if (streamChat == null) return <LoadingIndicator></LoadingIndicator>;

  return (
    <Chat client={streamChat}>
      <ChannelList
        List={Channels}
        sendChannelsToList
        filters={{ members: { $in: [user.id] } }}
      />
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

function Channels({ loadedChannels }: ChannelListMessengerProps) {
  const { setActiveChannel, channel: activeChannel } = useChatContext();

  return <div className="w-60 flex flex-col gap-4 m-3 h-full"></div>;
}

export default Home;
