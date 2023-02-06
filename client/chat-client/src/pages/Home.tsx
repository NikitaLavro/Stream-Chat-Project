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

//Components
import { Button } from "../components/Button";

//Router
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { setActiveChannel, channel: activeChannel } = useChatContext();
  const { logout } = useLoggenInAuth();

  return (
    <div className="w-60 flex flex-col gap-4 m-3 h-full">
      <Button onClick={() => navigate("/channel/new")}>New Conversation</Button>
      <hr className="border-gray-500" />
      {loadedChannels != null && loadedChannels.length > 0
        ? loadedChannels.map((channel) => {
            const isActive = channel === activeChannel;
            const extraClasses = isActive
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 bg-gray-100";
            return (
              <button
                onClick={() => {
                  setActiveChannel(channel);
                }}
                disabled={isActive}
                className={`p-4 rounded-lg flex gap-3 items-center ${extraClasses}`}
                key={channel.id}
              >
                {channel.data?.image && (
                  <img
                    src={channel.data.image}
                    className="w-10 h-10 rounded-full object-center object-cover"
                  />
                )}
                <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {channel.data?.name || channel.id}
                </div>
              </button>
            );
          })
        : "No Converstaions"}
      <hr className="border-gray-500 mt-auto" />
      <Button onClick={() => logout.mutate()} disabled={logout.isLoading}>
        Log Out
      </Button>
    </div>
  );
}

export default Home;
