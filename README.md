# drone-ctrl

## Getting Started
First, connect to your Tello drones WiFi network, once the connection is up and running you can start the application.
To start the application use either `npm start` or `node ./src/app.js`.

## Commands

The current commands you can send to your drone via the console are:

* `takeoff` - Tells the drone to begin auto takeoff. This command takes a few seconds to complete.
* `land` - Tells the drone to begin auto land. This command takes a few seconds to complete.
* `right x` - Tells the drone to fly to the right, replace x with desired distance between 20 and 500. Distance is in cm.
* `left x` - Tells the drone to fly to the left, replace x with desired distance between 20 and 500. Distance is in cm.
* `forward x` - Tells the drone to fly forwards (the direction in which the camera is located), replace x with desired distance between 20 and 500. Distance is in cm.
* `back x` - Tells the drone to fly backwards, replace x with desired distance between 20 and 500. Distance is in cm.


## Notes
Responses from the drone will be written to the console.