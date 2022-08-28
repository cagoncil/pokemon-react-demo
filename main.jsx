import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    // gives update() function access to component attributes like this.props and this.state
    this.update = this.update.bind(this);
    this.inputField = React.createRef();
    this.state = {
      name: 'Pikachu',
      imgURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      imgURLShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
      validSubmission: true
    }
  }

  update(){
    console.log('input value vs. input current value', this.inputField.value, this.inputField.current.value)
    const pokemon = this.inputField.current.value.toLowerCase();
    console.log('input val', pokemon)

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const imgURL = result.sprites.front_default;
      const imgURLShiny = result.sprites.front_shiny;
      const name = result.name[0].toUpperCase() + result.name.substring(1);
      console.log(name, imgURL, imgURLShiny)
      this.setState({
        name, // name: name,
        imgURL, // imgURL: imgURL,
        imgURLShiny // imgURLShiny: imgURLShiny
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
        validSubmission: false
      })
      // app.innerText = 'That submission was not recognized. Please try again.';
    })
  }

  render() {

    return (
      <div style={styles.container}>
        <h1>Pokemon Search</h1>
        <input ref={this.inputField} placeholder="Search pokemon"></input>
        <button onClick={this.update}>Submit</button>

        {/* <h1>{this.state.name}</h1>
        <img src={this.state.imgURL}/>
        <p>Regular {this.state.name}</p>
        <img src={this.state.imgURLShiny}/>
        <p>Shiny {this.state.name}</p> */}

        {/* <Result name={this.state.name} imgURL={this.state.imgURL} imgURLShiny={this.state.imgURLShiny}/> */}

        {this.state.validSubmission && <Result name={this.state.name} imgURL={this.state.imgURL} imgURLShiny={this.state.imgURLShiny}/>}
        {!this.state.validSubmission && <ErrorMsg/>}
      </div>
    );
  }
}

class Result extends React.Component {
  render(props) {
    return (
      <div>
        <p>Here's your result:</p>
        <h1>{this.props.name}</h1>
        <img src={this.props.imgURL}/>
        <p>Regular {this.props.name}</p>
        <img src={this.props.imgURLShiny}/>
        <p>Shiny {this.props.name}</p>
      </div>
    )
  }
}

class ErrorMsg extends React.Component {
  render() {
    return (
      <div>
        <p>That submission was not recognized. Please try again.</p>
      </div>
    )
  }
}


const styles = {
  container: {
    textAlign: 'center',
    margin: 'auto'
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
