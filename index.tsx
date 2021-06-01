import React, { Component } from "react";
import { render } from "react-dom";
import { PokemonSearch } from "./PokemonSearch";
import "./style.css";

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div>
        <PokemonSearch name="John Doe" numberOfPokemons={5} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
