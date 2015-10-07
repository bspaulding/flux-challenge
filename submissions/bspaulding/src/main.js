import { applyMiddleware, createStore, bindActionCreators } from "redux";
import reducer from "./reducers";
import { Provider, connect } from "react-redux";
import App from "./components/app";
import React from "react";
import actions from "./actions";
import thunk from "redux-thunk";
import mapStateToProps from "./selector";

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

const store = applyMiddleware(thunk)(createStore)(reducer);
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

var provider = (
  <Provider store={store}>
    {() => <ConnectedApp/>}
  </Provider>
);

React.render(provider, document.querySelector(".app-container"));
