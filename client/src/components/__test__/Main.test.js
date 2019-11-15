import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "../../reducers";

import Main from "../Main";
import Header from "../Header";
import PostList from "../posts/PostList";

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
          <Main />
        </BrowserRouter>
      </Provider>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  // test("has a valid snapshot", () => {
  //   const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
  //   const component = renderer.create(
  //     <Provider store={store}>
  //       <App />)
  //     </Provider>
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  it("renders the Header and PostList", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.find(Header).length).toEqual(1);
    expect(wrapper.find(PostList).length).toEqual(1);
  });
});
