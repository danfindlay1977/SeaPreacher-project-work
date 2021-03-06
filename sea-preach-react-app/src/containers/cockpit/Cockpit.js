import React from "react";
import Toolbar from "./Toolbar/Toolbar";
import Sidebar from "./Sidebar/Sidebar";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Infobar from "./Infobar/Inforbar";
import KeyPad from "./Control-btn/Control-btn";
import "./cockpit.css";
import Header from "../../components/Header/Header";
import auth from "../../auth";
import Axios from "axios";
import Login from "../Login/Login";
import { BrowserRouter, Route } from "react-router-dom";
import ControlBtn from "./Control-btn/Control-btn";
import Controls from "./Controls/Controls";
import Grabber from "./clawGrabber/clawGrabber";

import io from "socket.io-client";

const socket = io.connect();

class Cockpit extends React.Component {
  constructor() {
    super();
    this.state = {
      controlsOn: false,
      grabber: false,
      grabberValue: 0,
    };
  }
  componentDidMount() {
    console.log("in here !!!");
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        // left
        case 37:
          //this.left();
          socket.emit("left");
          break;
        // up
        case 38:
          socket.emit("forward");
          //  this.up();
          break;
        // right
        case 39:
          //  this.right();
          socket.emit("right");
          break;
        // down
        case 40:
          //  this.reverse();
          socket.emit("reverse");
          break;
      }
    });

    // get a websockots connection
  }
  forward = (e) => {
    socket.emit("forward");
  };
  reverse = (e) => {
    socket.emit("reverse");
  };

  left = (e) => {
    socket.emit("left");
  };
  right = (e) => {
    socket.emit("right");
  };

  start = (e) => {
    this.setState({ controlsOn: true });
  };
  stop = (e) => {
    this.setState({ controlsOn: false });
    socket.emit("stop");
  };

  switchControls() {
    switch (this.state.grabber) {
      case true:
        return (
          <Grabber
            grabberValue={this.state.grabberValue}
            onChangeSlider={this.sliderHandlar}
          />
        );
      case false:
        return (
          <Controls
            left={this.left}
            right={this.right}
            forward={this.forward}
            reverse={this.reverse}
          />
        );
    }
  }

  menuClickHandler = (e) => {
    if (e.target.className == "cockpit-btn") {
      this.setState({ grabber: false });
    } else {
      this.setState({ grabber: true });
    }
  };

  sliderHandlar = (e) => this.setState({ grabberValue: e.target.value });

  render() {
    return (
      <div className="cockpit">
        <Toolbar
          click={this.menuClickHandler}
          title={this.props.title}
          logOut={this.props.logOut}
        />
        <VideoPlayer />
        {this.switchControls()}
        <Sidebar />
        <ControlBtn start={this.start} stop={this.stop} />
        <Infobar />
      </div>
    );
  }
}

export default Cockpit;
