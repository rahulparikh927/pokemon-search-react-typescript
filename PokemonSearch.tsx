import React, { Component } from "react";
import User from "./User.interfaces";
// export const PokemonSearch = () => {
//   return <div>fefe</div>;
// };

interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}

interface Pokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

export class PokemonSearch extends Component<User, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;
  constructor(props: User) {
    super(props);
    this.state = {
      error: false,
      pokemon: null
    };
    this.pokemonRef = React.createRef();
  }

  onSearchClick = () => {
    const inputValue = this.pokemonRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then(res => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then(data => {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default
          }
        });
      });
    });
  };

  render() {
    const { name: userName, numberOfPokemons } = this.props;
    const { error, pokemon } = this.state;

    let resultMaarkup;

    if (error) {
      console.log(error);
      resultMaarkup = <p>Pokemon not found, please try again</p>;
    } else if (this.state.pokemon) {
      resultMaarkup = (
        <div>
          <img src={pokemon.imageUrl} alt="Pokemon" />
          <p>
            {pokemon.name} has {pokemon.numberOfAbilities} abilities and{" "}
            {pokemon.baseExperience} base experience.
          </p>
        </div>
      );
    }

    return (
      <div>
        <p>
          User {userName}{" "}
          {numberOfPokemons && <span>has {numberOfPokemons} pokemons</span>}
        </p>
        <input type="text" placeholder="pikachu" ref={this.pokemonRef} />
        <button onClick={this.onSearchClick} className="my-button">
          Search
        </button>
        {resultMaarkup}
      </div>
    );
  }
}
