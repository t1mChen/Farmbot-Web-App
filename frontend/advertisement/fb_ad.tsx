import React from "react";
import { isUndefined } from "lodash";
import { Actions } from "../constants";
import { adPopupProps, adPopupsProps, adPopupState } from "./interfaces";
import { store } from "../redux/store";
import { Markdown } from "../ui";

export class adPopUP extends React.Component<adPopupProps, adPopupState> {
  state: adPopupState = {
    timeout: 7,
    isHovered: false,
    detached: false,
    dismissed: false,
    intervalId: undefined,
  };

  get timed() { return !this.props.noTimer && !this.props.noDismiss; }

  componentDidMount() {
    this.timed &&
      this.setState({ intervalId: setInterval(this.advanceTimer, 100) });
  }

  componentWillUnmount() {
    !isUndefined(this.state.intervalId) && clearInterval(this.state.intervalId);
  }

  detach = () => {
    this.setState({ detached: true });
    setTimeout(() =>
      this.props.dispatch({ type: Actions.REMOVE_ADPOPUP, payload: this.props.id }));
  };

  advanceTimer = () => {
    if (this.state.isHovered || !this.timed || this.state.detached) {
      return;
    }
    if (this.state.timeout <= 0.800) { this.dismiss(); }
    this.setState({ timeout: this.state.timeout - 0.100 });
    if (this.state.timeout <= 0) { this.detach(); }
  };

  dismiss = () => {
    if (this.props.noDismiss) { return; }
    this.setState({ dismissed: true });
    this.detach();
  };

  render() {
    const { color } = this.props;
    const style = {
      animationPlayState: this.state.isHovered ? "paused" : "running",
    };
    const classNames = [
      "adpopup",
      "active",
      color,
      !this.timed ? "no-timer" : "",
      this.state.dismissed ? "poof" : "",
      this.state.detached ? "gone" : "",
    ];
    return <div
      className={classNames.join(" ")}
      id={this.props.id}
      onClick={this.dismiss}
      onMouseEnter={() => this.setState({ isHovered: true })}
      onMouseLeave={() => this.setState({ isHovered: false })}>
      <h4 className={"adpopup-title"}>{this.props.title}</h4>
      <div className={"adpopup-message"}>
        <Markdown>
          {this.props.message.replace(/\s+/g, " ")}
        </Markdown>
      </div>
      <div className={"adpopup-loader"}>
        <div className={`adpopup-loader-left ${color}`} style={style}></div>
        <div className={"adpopup-loader-right"} style={style}></div>
        <div className={"adpopup-loader-spinner"} style={style}></div>
      </div>
    </div>;
  }
}

export const adPopupContainer = () =>
  <div className={"adpopup-container"}>
    <adPopUps
      adpopupMessages={store.getState().app.toasts}
      dispatch={store.dispatch} />
  </div>;

export const adPopUps = (props: adPopupsProps) =>
  <div className={"adpopups"}>
    {Object.values(props.adpopupMessages).map(adpopupProps =>
      <adPopUP key={adpopupProps.id} dispatch={props.dispatch} {...adpopupProps} />)}
  </div>;
