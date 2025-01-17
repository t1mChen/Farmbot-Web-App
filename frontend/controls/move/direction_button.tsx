import React from "react";
import { moveRelative, moveRelativeDemo } from "../../devices/actions";
import { ButtonDirection, DirectionButtonProps } from "./interfaces";
import { t } from "../../i18next_wrapper";
import { MoveRelProps } from "../../devices/interfaces";
import { lockedClass } from "../locked_class";
import { Popover } from "../../ui";
import { setMovementState } from "../../connectivity/log_handlers";
import { movementPercentRemaining } from "../../farm_designer/move_to";
import { forceOnline } from "../../devices/must_be_online";
import {demoPos, maybePopupAd} from "../../demo/demo_support_framework/supports";

export function directionDisabled(props: DirectionButtonProps): boolean {
  const {
    stopAtHome, stopAtMax, axisLength, position, isInverted, negativeOnly
  } = props.directionAxisProps;
  const { direction } = props;
  const loc = position || 0;
  const jog = calculateDistance(props);

  // determine demo features control management restrictions
  if(forceOnline()){
    if((loc + jog)<0||(loc+jog)>axisLength){
      return true;
    }
    return false;
  }
  const directionDisableHome = (stopAtHome && loc === 0 &&
    (negativeOnly ? jog > 0 : jog < 0));
    
  // there was problem with the original movement logic
  const directionDisableEnd = stopAtMax && axisLength > 0 &&
    Math.abs(loc) === axisLength && Math.abs(loc + jog) > axisLength;


  switch (direction) {
    case "left":
    case "down":
      return (isInverted === negativeOnly)
        ? directionDisableHome
        : directionDisableEnd;
    case "right":
    case "up":
      return (isInverted === !negativeOnly)
        ? directionDisableHome
        : directionDisableEnd;
  }
}

export function calculateDistance(props: DirectionButtonProps) {
  const { direction } = props;
  const { isInverted } = props.directionAxisProps;
  const isNegative = (direction === "down") || (direction === "left");
  const inverter = isInverted ? -1 : 1;
  const multiplier = isNegative ? -1 : 1;
  const distance = props.steps * multiplier * inverter;
  return distance;
}

export const calcBtnStyle = (
  direction: ButtonDirection,
  remaining: number | undefined,
): React.CSSProperties => ({
  [["left", "right"].includes(direction) ? "width" : "height"]: remaining + "%",
  [direction == "up" ? "bottom" : "top"]: 0,
  [direction == "left" ? "right" : "left"]: 0,
});

interface DirectionButtonState {
  popoverOpen: boolean;
  popoverText: string;
}

export class DirectionButton
  extends React.Component<DirectionButtonProps, DirectionButtonState> {
  state: DirectionButtonState = {
    popoverOpen: false,
    popoverText: "",
  };

  get btnActive() {
    const { axis, movementState } = this.props;
    const { distance } = movementState;
    return (distance[axis] > 0 && this.distance > 0)
      || (distance[axis] < 0 && this.distance < 0);
  }

  get popActive() {
    return this.props.popover == this.props.axis + this.props.direction;
  }

  sendCommand = () => {
      if(forceOnline()){
        maybePopupAd();
      }

    const { botPosition, locked, axis, arduinoBusy, botOnline } = this.props;
    const buttonId = axis + this.props.direction;
    this.props.setActivePopover(buttonId);
    const text = () => {
      if (locked) { return t("FarmBot is locked"); }
      if (arduinoBusy) { return t("FarmBot is busy"); }
      if (!botOnline) { return t("FarmBot is offline"); }
      if (directionDisabled(this.props) && this.distance > 0) {
        return t("Axis is already at maximum position");
      }
      if (directionDisabled(this.props) && this.distance < 0) {
        return t("Axis is already at minimum position");
      }
      return "";
    };
    // maintain the original movement logic if using real bot
    if (!forceOnline()){
      if (arduinoBusy || !botOnline || locked || directionDisabled(this.props)) {
        this.setState({
          popoverOpen: !this.state.popoverOpen,
          popoverText: text(),
        });
        return;
      }
      this.setState({ popoverOpen: false, popoverText: text() });
      const payload: MoveRelProps = { x: 0, y: 0, z: 0 };
      payload[this.props.axis] = this.distance;
      moveRelative(payload);
      this.props.dispatch(setMovementState({
        start: botPosition,
        distance: { x: 0, y: 0, z: 0, [axis]: this.distance },
      }));
      // simulations carried out when simulating in demo
    }else{
      // check if movement is valid
      if (directionDisabled(this.props)) {
        this.setState({
          popoverOpen: !this.state.popoverOpen,
          popoverText: text(),
        });
        return;
      }
      // use demo funtions and data
      this.setState({ popoverOpen: false, popoverText: text() });
      const payload: MoveRelProps = { x: 0, y: 0, z: 0 };
      payload[this.props.axis] = this.distance;
      // customised simulative function
      moveRelativeDemo(payload);

    }
  };

  get distance() { return calculateDistance(this.props); }

  render() {
    const {
      direction, axis, locked, arduinoBusy, botOnline, botPosition, movementState,
    } = this.props;
    const demop = demoPos;
    const title = `${t("move {{axis}} axis", { axis })} (${this.distance})`;
    var remaining;
    // check demo properties and load data
    if(forceOnline()){
      remaining = movementPercentRemaining(demop, movementState);
    }else{
      remaining = movementPercentRemaining(botPosition, movementState);
    }
    const style = calcBtnStyle(direction, remaining);
    var disabled;
    // neglect other restrictions if in demo
    if(forceOnline()){
      disabled = directionDisabled(this.props);
      //console.log(disabled);
    }else{
      disabled = arduinoBusy || !botOnline || directionDisabled(this.props);
    }
    return <button
      onClick={this.sendCommand}
      className={[
        "fb-button arrow-button radius",
        `fa fa-2x fa-arrow-${direction}`,
        axis == "z" ? "z" : "",
        lockedClass(locked),
        disabled ? "pseudo-disabled" : "",
      ].join(" ")}
      title={title}>
      <p>{this.distance > 0 ? "+" : "-"}{axis}</p>
      {(this.btnActive && remaining && arduinoBusy)
        ? <div className={"movement-progress"} style={style} />
        : <i />}
      <Popover
        isOpen={this.popActive && this.state.popoverOpen}
        popoverClassName={"help movement-message"}
        target={<i />}
        content={<div className={"help-text-content"}>
          {t(this.state.popoverText)}
        </div>} />
    </button>;
  }
}
