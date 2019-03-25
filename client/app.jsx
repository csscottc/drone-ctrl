import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import socket from "./socket/socket";

const DroneController = function DroneController(props) {
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        function handleMessage(message) {
            console.log(message);
            setMessages(messages => [...messages, message]);
        }
        socket.on("message", handleMessage)
    },() => {
        socket.removeListener("on", handleMessage);
    });

    function handleTakeoff() {
        socket.send("takeoff");
    }
    function handleLand() {
        socket.send("land");
    }
    return (
        <React.Fragment>
            <button onClick={handleTakeoff}>Take off!</button>
            <button onClick={handleLand}>Land!</button>
        <div>
            Hello World
            {messages.map((m,idx) => <p key={idx}>{m}</p>)}
        </div>
        </React.Fragment>
    );
};

const node = document.getElementById("app");
ReactDOM.render(<DroneController />, node);
