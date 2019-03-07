import React from "react";
import ReactDOM from "react-dom";

const DroneController = function DroneController(props) {
    return (
        <div>
            Hello World
        </div>
    );
};

const node = document.getElementById("app");
ReactDOM.render(<DroneController />, node);
