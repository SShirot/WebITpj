
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import io from "socket.io-client";
import RoomPage from '../../frontend/src/pages/RoomPage';
import './App.css';
import Forms from './components/Forms';
const server ="http://localhost:5000";
const connectionOptions = {
  "force new connection" : true,
  reconnectingAttempts:"Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
const socket = io(server,connectionOptions);


const App = () => {

  const [user,setUser] = useState(null);
  useEffect(() => {
    socket.on("userJoined",(data)=>{
      if(data.success){
        console.log("userJoined");
      }
      else{
        console.log("userJoined Error");
      }
    })
  })
  const uuid =() => {
    let S4 = () => {
      return (((1+ Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return(
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser}/>} />
          <Route path="/:roomId" element={<RoomPage  socket = {socket} user={user}/>} />
        </Routes>
      </div>
    </>
  );
};

export default App
