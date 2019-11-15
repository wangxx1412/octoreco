import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import reduxThunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import reducers from "../../reducers";
import { mount } from "enzyme";

import PostShow from "../PostShow";
import Header from "../Header";

describe("Main", () => {
  let store;
  beforeEach(() => {
    store = createStore(reducers, {}, applyMiddleware(reduxThunk));
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <PostShow />
        </BrowserRouter>
      </Provider>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Header and ", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <PostShow />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.find(Header).length).toEqual(1);
  });
});
