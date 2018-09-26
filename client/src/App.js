import React, { Component } from "react";
import AppNavbar from "./Components/AppNavbar.js";
import Products from "./Product/product";
import "./App.css";
// import "./components/product.css";
// import { ListGroup, ListGroupItem } from "reactstrap";

class App extends Component {

  render() {
    return (
      <div>
        <AppNavbar />
        {/* <Products onChange={fields => this.onChange(fields)} /> */}
        <Products />
        {/* <DropModal /> */}
        {/* <ListGroup className="App">
          <ListGroupItem>
            {JSON.stringify(this.state.fields, null, 2)}{" "}
          </ListGroupItem>
        </ListGroup> */}
        {/* <p> {JSON.stringify(this.state.fields, null, 2)} </p> */}
      </div>
    );
  }
}

export default App;
