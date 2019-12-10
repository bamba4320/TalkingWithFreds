import React from "react";
import Index from "./pages";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: <Index />
    };
  }

  render() {
    return <div className="App">{this.state.page}</div>;
  }
}

export default App;
