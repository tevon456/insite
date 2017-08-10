import React, { Component } from "react";

const defaultStyles = {
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden"
  },
  sidebar: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    transition: "transform .3s ease-out",
    WebkitTransition: "-webkit-transform .3s ease-out",
    willChange: "transform",
    overflowY: "auto"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "scroll",
    WebkitOverflowScrolling: "touch",
    transition: "left .3s ease-out, right .3s ease-out"
  },
  overlay: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .3s ease-out, visibility .3s ease-out",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  dragHandle: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    bottom: 0
  }
};

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    };
  }

  onSetOpen = open => {
    this.setState({
      open: open
    });
  };

  menuButtonClick = event => {
    event.preventDefault();
    this.onSetOpen(!this.state.open);
  };

  render() {
    const rootProps = {
      className: this.props.rootClassName,
      style: { ...defaultStyles.root, ...this.props.styles.root },
      role: "navigation"
    };

    const sidebarStyle = {
      ...defaultStyles.sidebar,
      ...this.props.styles.sidebar
    };
    const contentStyle = {
      ...defaultStyles.content,
      ...this.props.styles.content
    };
    const overlayStyle = {
      ...defaultStyles.overlay,
      ...this.props.styles.overlay
    };

    if (this.state.open) {
      sidebarStyle.transform = `translateX(0%)`;
      sidebarStyle.WebkitTransform = `translateX(0%)`;
    }
    return (
      <div {...rootProps}>
        <a onClick={this.menuButtonClick} className="toggleSideBar" />
        <div className={this.props.sidebarClassName} style={sidebarStyle}>
          {this.props.sidebar}
        </div>
        <div
          className={this.props.overlayClassName}
          style={overlayStyle}
          role="presentation"
          tabIndex="0"
          onClick={this.overlayClicked}
        />
        <div className={this.props.contentClassName} style={contentStyle}>
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

SideBar.defaultProps = {
  docked: false,
  open: false,
  transitions: true,
  touch: true,
  touchHandleWidth: 20,
  pullRight: false,
  shadow: true,
  dragToggleDistance: 30,
  onSetOpen: () => {},
  styles: {},
  defaultSidebarWidth: 50
};

export default SideBar;
