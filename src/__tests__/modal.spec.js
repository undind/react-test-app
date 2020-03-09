import React from "react";
import { mount } from "enzyme";
import Modal from "../components/Modal";

describe("Tests Modal", () => {
  it("Get header text", () => {
    const wrapper = mount(<Modal header='Add ticket' />);
    expect(wrapper.prop('header')).toEqual('Add ticket');
  });

  it("Get button text", () => {
    const wrapper = mount(<Modal btnText='Add ticket' />);
    expect(wrapper.prop('btnText')).toEqual('Add ticket');
  });
});
