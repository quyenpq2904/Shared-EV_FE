"use client";

import { IUser } from "@/types/User";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Divider,
  Input,
  ScrollShadow,
  Textarea,
  Tooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: "text" | "image";
}

export interface ChatGroup {
  id: string;
  name: string;
  type: "inquiry" | "group" | "system";
  groupAvatar?: string;
  members: IUser[];
  messages: Message[];
  unreadCount: number;
  lastMessage: string;
  lastActive: string;
  isOnline?: boolean;
}

export const mockChats: ChatGroup[] = [
  {
    id: "1",
    name: "Inquiry: 2023 Tesla Model Y",
    type: "inquiry",
    groupAvatar:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
    members: [
      { id: "u1", name: "Jane Doe", avatar: "https://i.pravatar.cc/150?u=u1" },
      {
        id: "u2",
        name: "Alex (Broker)",
        avatar: "https://i.pravatar.cc/150?u=u2",
      },
    ],
    unreadCount: 2,
    lastMessage: "Looking forward to hearing from you!",
    lastActive: "10:30 AM",
    isOnline: true,
    messages: [
      {
        id: "m1",
        senderId: "u1",
        content:
          "Hey Alex, I'm very interested in the Weekend & Holiday share for your Tesla Model Y. Could you provide a bit more detail on the mileage limits?",
        timestamp: "10:30 AM",
        type: "text",
      },
      {
        id: "m2",
        senderId: "me",
        content:
          "Hi Jane, thanks for your interest! The share includes 5,000 miles per year, and our comprehensive insurance is part of the monthly cost-sharing fee. The price is firm as it reflects the vehicle's value.",
        timestamp: "10:45 AM",
        type: "text",
      },
      {
        id: "m3",
        senderId: "u1",
        content:
          "That sounds reasonable. How about the charging station availability?",
        timestamp: "10:50 AM",
        type: "text",
      },
      {
        id: "m4",
        senderId: "u1",
        content:
          "That sounds reasonable. How about the charging station availability?",
        timestamp: "10:55 AM",
        type: "text",
      },
    ],
  },
  {
    id: "2",
    name: "System Notifications",
    type: "system",
    members: [{ id: "sys", name: "System", avatar: "" }],
    unreadCount: 1,
    lastMessage: "Your offering approved.",
    lastActive: "Yesterday",
    messages: [],
  },
  {
    id: "3",
    name: "Maintenance Crew",
    type: "group",
    groupAvatar:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
    members: [
      { id: "u3", name: "Mark", avatar: "https://i.pravatar.cc/150?u=u3" },
      { id: "u4", name: "Sarah", avatar: "https://i.pravatar.cc/150?u=u4" },
    ],
    unreadCount: 0,
    lastMessage: "Station ready?",
    lastActive: "Mar 14",
    messages: [],
  },
];

function MessagesPage() {
  const [selectedChatId, setSelectedChatId] = useState<string>(mockChats[0].id);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archived">(
    "all"
  );

  const activeChat =
    mockChats.find((c) => c.id === selectedChatId) || mockChats[0];

  const renderListAvatar = (chat: ChatGroup) => {
    if (chat.type === "system") {
      return (
        <div className="w-10 h-10 rounded-full bg-[#E5B584] flex items-center justify-center text-black">
          <Icon icon="solar:bell-bing-bold" className="text-xl" />
        </div>
      );
    }
    if (chat.groupAvatar) {
      return (
        <Badge
          content=""
          color="success"
          shape="circle"
          placement="bottom-right"
          isInvisible={!chat.isOnline}
          className="border-[#121C1F]"
        >
          <Avatar
            src={chat.groupAvatar}
            size="md"
            isBordered={false}
            className="rounded-2xl"
          />
        </Badge>
      );
    }
    const targetMember =
      chat.members.find((m) => m.id !== "me") || chat.members[0];

    return (
      <Badge
        content=""
        color="success"
        shape="circle"
        placement="bottom-right"
        isInvisible={!chat.isOnline}
        className="border-[#121C1F]"
      >
        <Avatar src={targetMember?.avatar} size="md" />
      </Badge>
    );
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-default-900">Messages</h1>
      <Divider className="my-4" />
      <div className="flex h-[calc(100vh-15rem)] gap-3">
        <div className="w-[350px] flex flex-col gap-4 shrink-0">
          <Input
            placeholder="Search messages..."
            startContent={
              <Icon icon="solar:magnifer-linear" className="text-default-500" />
            }
          />

          <div className="flex gap-2">
            {["all", "unread", "archived"].map((tab) => (
              <Chip
                key={tab}
                color={activeTab === tab ? "success" : "default"}
                variant={activeTab === tab ? "solid" : "flat"}
                className={`cursor-pointer capitalize`}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab}
              </Chip>
            ))}
          </div>

          <ScrollShadow className="flex-1 -mx-2 px-2">
            <div className="flex flex-col">
              {mockChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`flex gap-3 p-3 cursor-pointer border-b-1 border-default-400 transition-all ${
                    selectedChatId === chat.id
                      ? "bg-foreground/30"
                      : "hover:bg-foreground/20"
                  }`}
                >
                  <div className="shrink-0 pt-1">{renderListAvatar(chat)}</div>

                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-semibold truncate text-foreground/70`}
                      >
                        {chat.name}
                      </span>
                      <span
                        className={`text-xs ${
                          selectedChatId === chat.id
                            ? "text-default-900"
                            : "text-default-600"
                        } whitespace-nowrap`}
                      >
                        {chat.lastActive}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        chat.unreadCount > 0
                          ? "font-medium"
                          : "text-default-600"
                      }`}
                    >
                      {chat.lastMessage}
                    </p>
                  </div>

                  {chat.unreadCount > 0 && (
                    <div className="shrink-0 flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00E396]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollShadow>
        </div>

        <div className="hidden md:flex flex-1 flex-col bg-default-300 border border-default-100/5 rounded-xl overflow-hidden">
          <div className="h-16 border-b border-default-600 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              {activeChat.type === "system" ? (
                <div className="w-10 h-10 rounded-full bg-[#E5B584] flex items-center justify-center text-black">
                  <Icon icon="solar:bell-bing-bold" />
                </div>
              ) : (
                <Avatar
                  src={
                    activeChat.groupAvatar ||
                    activeChat.members.find((m) => m.id !== "me")?.avatar
                  }
                  className={
                    activeChat.groupAvatar ? "rounded-xl" : "rounded-full"
                  }
                />
              )}

              <div>
                <h3 className="font-bold">{activeChat.name}</h3>
                {activeChat.type !== "system" && (
                  <p className="text-xs text-default-700 truncate max-w-[300px]">
                    {activeChat.type === "group"
                      ? `${activeChat.members.length} members: `
                      : "With: "}
                    {activeChat.members.map((m) => m.name).join(", ")}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                isIconOnly
                variant="light"
                className="text-default-400 hover:text-white"
              >
                <Icon
                  icon="solar:archive-down-minimlistic-linear"
                  className="text-xl"
                />
              </Button>
              <Button
                isIconOnly
                variant="light"
                className="text-default-400 hover:text-white"
              >
                <Icon icon="solar:trash-bin-trash-linear" className="text-xl" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                className="text-default-400 hover:text-white"
              >
                <Icon icon="solar:menu-dots-bold" className="text-xl" />
              </Button>
            </div>
          </div>
          <ScrollShadow className="flex-1 p-6 space-y-1">
            {activeChat.messages.map((msg, index) => {
              const isMe = msg.senderId === "me";
              const sender = activeChat.members.find(
                (m) => m.id === msg.senderId
              ) || { name: "You", avatar: "https://i.pravatar.cc/150?u=me" };

              const nextMsg = activeChat.messages[index + 1];
              const isLastInSequence =
                !nextMsg || nextMsg.senderId !== msg.senderId;
              const isFirstInSequence =
                index === 0 ||
                activeChat.messages[index - 1].senderId !== msg.senderId;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-4 items-end ${
                    isMe ? "flex-row-reverse" : "flex-row"
                  } ${isLastInSequence ? "mb-4" : "mb-1"}`}
                >
                  {!isMe && (
                    <div className="w-10 shrink-0 flex items-end justify-center">
                      {isLastInSequence ? (
                        <Tooltip
                          content={sender.name}
                          color="foreground"
                          placement="top"
                        >
                          <Avatar src={sender.avatar} className="w-8 h-8" />
                        </Tooltip>
                      ) : (
                        <div className="w-8" />
                      )}
                    </div>
                  )}

                  <div
                    className={`flex flex-col max-w-[70%] ${
                      isMe ? "items-end" : "items-start"
                    }`}
                  >
                    <Tooltip
                      content={msg.timestamp}
                      color="foreground"
                      placement={isMe ? "left" : "right"}
                    >
                      <div
                        className={`p-3 px-4 text-sm leading-relaxed ${
                          isMe
                            ? `bg-[#00E396] text-black 
                             ${
                               isLastInSequence
                                 ? "rounded-br-none rounded-2xl"
                                 : "rounded-2xl rounded-br-sm"
                             }
                             ${
                               !isFirstInSequence && !isLastInSequence
                                 ? "rounded-r-sm"
                                 : ""
                             }
                             ${
                               isFirstInSequence && !isLastInSequence
                                 ? "rounded-tr-2xl rounded-br-sm"
                                 : ""
                             }
                            `
                            : `bg-default-600 text-white border border-default-100/10
                             ${
                               isLastInSequence
                                 ? "rounded-bl-none rounded-2xl"
                                 : "rounded-2xl rounded-bl-sm"
                             }
                             ${
                               !isFirstInSequence && !isLastInSequence
                                 ? "rounded-l-sm"
                                 : ""
                             }
                             ${
                               isFirstInSequence && !isLastInSequence
                                 ? "rounded-tl-2xl rounded-bl-sm"
                                 : ""
                             }
                            `
                        }`}
                      >
                        {msg.content}
                      </div>
                    </Tooltip>
                  </div>

                  {isMe && <div className="w-10 shrink-0" />}
                </div>
              );
            })}
          </ScrollShadow>

          <div className="p-6">
            <Textarea
              minRows={1}
              maxRows={4}
              placeholder="Type your reply here..."
              variant="flat"
            />
            <div className="flex justify-between items-center pb-1 pt-2">
              <div className="flex gap-2">
                <Button isIconOnly size="sm" variant="light">
                  <Icon icon="solar:paperclip-linear" className="text-lg" />
                </Button>
                <Button isIconOnly size="sm" variant="light">
                  <Icon icon="solar:smile-circle-linear" className="text-lg" />
                </Button>
              </div>
              <Button
                size="sm"
                className="bg-[#00E396] text-black font-bold px-6"
                endContent={<Icon icon="solar:plain-3-bold" />}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
