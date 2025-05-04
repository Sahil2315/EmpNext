import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const socket = io("https://emplois.sahilnigam.online", {
  transports: ["websocket"],
  rejectUnauthorized: false,
});
import teamLogo from "../images/teamLogo.svg";
import globeLogo from "../images/globeLogo.svg";
import { empContext, empState } from "./userProvider";
import { messageTS } from "../types";

const Chat = () => {
  const [allChat, resetAllChat] = useState<messageTS[]>([]);
  const [teamChat, resetTeamChat] = useState<messageTS[]>([]);
  const [chatMode, setChatmode] = useState<string>("All");
  const bottomOfChat = useRef<HTMLDivElement>(null);
  const [connection, toggleConnection] = useState<boolean>(false);
  const { user } = useContext(empContext) as empState;
  const [msgText, setMsgText] = useState("");
  useEffect(() => {
    if (!connection && user.team != -1) {
      socket.emit("InitConnect", {
        team: user.team,
      });
      toggleConnection(true);
      console.log("Connected")
    }
  }, [user]);
  useEffect(() => {
    if (chatMode == "All") {
      bottomOfChat.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [allChat]);
  useEffect(() => {
    if (chatMode == "Team") {
      bottomOfChat.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [teamChat]);
  useEffect(() => {
    bottomOfChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMode]);

  socket.on("InitResp", (arr) => {
    resetAllChat(arr.allChat);
    resetTeamChat(arr.teamChat);
    console.log(arr);
  });
  socket.on("AllChatReceived", (details: messageTS) => {
    resetAllChat([...allChat, { ...details }]);
  });
  socket.on("TeamChatReceived", (details: messageTS) => {
    resetTeamChat([...teamChat, { ...details }]);
  });
  const lastEmp = useRef<string>("");
  function sendMsg() {
    if (msgText == "") return;
    if (chatMode == "All") {
      socket.emit("newMsg", {
        msgCont: msgText,
        ename: user.name,
        empid: user.empid,
        team: 0,
      });
      setMsgText("");
    } else {
      socket.emit("newMsg", {
        msgCont: msgText,
        ename: user.name,
        empid: user.empid,
        team: user.team,
      });
      // resetTeamChat([...teamChat, {empid: user.empid, ename: user.name, date: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`, time: `${newDate.getHours()}-${newDate.getMinutes()}`, msgcont: msgText, team: 0}])
      setMsgText("");
    }
  }
  return (
    <div className={`mt-4 w-full h-full rounded-lg bg-indigo-600/20 p-2`}>
      <div className="flex flex-row w-full h-full bg-black/50">
        <div className="flex flex-col justify-center items-center px-6 my-4 border-r-2 border-violet-500/15">
          <button
            onClick={() => {
              setChatmode("Team");
            }}
            className={`text-xl flex flex-row items-center my-4 py-3 px-4 rounded-lg ${
              chatMode == "Team"
                ? "bg-white/10 border-indigo-500/15 border-b-4"
                : "hover:bg-slate-900/50"
            }`}
          >
            {" "}
            <img className="h-[33px] mr-3" src={teamLogo.src} />{" "}
            <span>Team Chat</span>
          </button>
          <button
            onClick={() => {
              setChatmode("All");
            }}
            className={`text-xl flex flex-row items-center my-4 py-2 px-4 rounded-lg ${
              chatMode == "All"
                ? "bg-white/10 border-indigo-500/15 border-b-4"
                : "hover:bg-slate-900/50"
            }`}
          >
            {" "}
            <img className="h-[38px] mr-4" src={globeLogo.src} />{" "}
            <span>All Chat</span>
          </button>
        </div>
        <div className="h-full flex-1 relative flex flex-col pt-4 pb-[70px]">
          <div className="flex flex-col overflow-y-scroll h-[670px]">
            {chatMode == "All"
              ? allChat?.map((msg, index) => {
                  const isLastSender = msg.empid == lastEmp.current;
                  lastEmp.current = msg.empid;

                  if (msg.empid == user?.empid) {
                    return (
                      <div
                        key={index}
                        className={`bg-blue-700 w-[75%] relative mr-4 ml-auto py-1 px-2 rounded-lg flex items-center ${
                          isLastSender ? "mt-[4px]" : "mt-4"
                        }`}
                      >
                        <span className="mr-12">{msg.msgcont}</span>
                        <span className="absolute right-3 bottom-2 text-xs text-blue-300">
                          {msg.time.slice(0, 5)}
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="flex flex-col">
                        <div
                          className={
                            isLastSender ? "hidden" : "flex flex-row mt-4"
                          }
                        >
                          <span className="ml-4 text-sm">{msg.ename}</span>
                          <span className="ml-4 text-sm pl-4 border-l-4 border-indigo-50030 text-slate-400">
                            {msg.empid}
                          </span>
                        </div>
                        <div className="mt-[4px] pr-12 bg-slate-600 ml-4 relative w-[75%] py-1 px-2 rounded-lg">
                          <span>{msg.msgcont}</span>
                          <span className="absolute right-3 bottom-2 text-xs text-slate-400">
                            {msg.time.slice(0, 5)}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })
              : teamChat?.map((msg, index) => {
                  const isLastSender = msg.empid == lastEmp.current;
                  lastEmp.current = msg.empid;

                  if (msg.empid == user?.empid) {
                    return (
                      <div
                        key={index}
                        className={`bg-blue-700 w-[75%] relative mr-4 ml-auto py-1 px-2 rounded-lg flex items-center ${
                          isLastSender ? "mt-[4px]" : "mt-4"
                        }`}
                      >
                        <span className="mr-12">{msg.msgcont}</span>
                        <span className="absolute right-3 bottom-2 text-xs text-blue-300">
                          {msg.time.slice(0, 5)}
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="flex flex-col">
                        <div
                          className={
                            isLastSender ? "hidden" : "flex flex-row mt-4"
                          }
                        >
                          <span className="ml-4 text-sm">{msg.ename}</span>
                          <span className="ml-4 text-sm pl-4 border-l-4 border-indigo-500/30 text-slate-400">
                            {msg.empid}
                          </span>
                        </div>
                        <div className="mt-[4px] pr-12 bg-slate-600 ml-4 relative w-[75%] py-1 px-2 rounded-lg">
                          <span>{msg.msgcont}</span>
                          <span className="absolute right-3 bottom-2 text-xs text-slate-400">
                            {msg.time.slice(0, 5)}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
            <div ref={bottomOfChat} />
          </div>
          <div className="absolute w-full bottom-0 flex flex-row py-2 px-4">
            <input
              onChange={(e) => {
                setMsgText(e.target.value);
              }}
              type="text"
              value={msgText}
              placeholder={
                chatMode == "All"
                  ? "Message to the Company"
                  : "Message to the Team"
              }
              className="px-2 rounded-lg flex-1 bg-zinc-700/40 outline-none"
            />
            <button
              onClick={sendMsg}
              className="py-2 text-2xl px-2 rounded-xl ml-2 bg-violet-600/30 hover:bg-violet-600/60"
            >
              {"-->"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
