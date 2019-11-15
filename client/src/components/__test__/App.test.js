import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import reduxThunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import reducers from "../../reducers";
import { mount } from "enzyme";
import App from "../App";
import Landing from "../Landing";

describe.only("App", () => {
  let store;
  beforeEach(() => {
    store = createStore(reducers, {}, applyMiddleware(reduxThunk));
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />)
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the Landing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find(Landing).length).toEqual(1);
  });
});
