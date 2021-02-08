const mockDevice = { moveRelative: jest.fn((_) => Promise.resolve()) };
jest.mock("../../../device", () => ({ getDevice: () => mockDevice }));

import React from "react";
import { mount } from "enzyme";
import { JogButtons } from "../jog_buttons";
import { JogMovementControlsProps } from "../interfaces";
import { bot } from "../../../__test_support__/fake_state/bot";
import { fakeWebAppConfig } from "../../../__test_support__/fake_state/resources";

describe("<JogButtons />", () => {
  const mockConfig = fakeWebAppConfig();

  const jogButtonProps = (): JogMovementControlsProps => ({
    stepSize: 100,
    botPosition: { x: undefined, y: undefined, z: undefined },
    getConfigValue: key => mockConfig.body[key],
    disabled: false,
    firmwareSettings: bot.hardware.mcu_params,
    env: {},
  });

  it("is disabled", () => {
    const p = jogButtonProps();
    p.disabled = true;
    const jogButtons = mount(<JogButtons {...p} />);
    jogButtons.find("button").at(7).simulate("click");
    expect(mockDevice.moveRelative).not.toHaveBeenCalled();
  });

  it("has unswapped xy jog buttons", () => {
    const jogButtons = mount(<JogButtons {...jogButtonProps()} />);
    const button = jogButtons.find("button").at(7);
    expect(button.props().title).toBe("move x axis (100)");
    button.simulate("click");
    expect(mockDevice.moveRelative)
      .toHaveBeenCalledWith({ x: 100, y: 0, z: 0 });
  });

  it("has swapped xy jog buttons", () => {
    mockConfig.body.xy_swap = true;
    const p = jogButtonProps();
    (p.stepSize as number | undefined) = undefined;
    const jogButtons = mount(<JogButtons {...p} />);
    const button = jogButtons.find("button").at(7);
    expect(button.props().title).toBe("move y axis (100)");
    button.simulate("click");
    expect(mockDevice.moveRelative)
      .toHaveBeenCalledWith({ x: 0, y: 100, z: 0 });
  });
});
