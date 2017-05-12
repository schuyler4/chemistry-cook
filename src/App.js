import firebase from 'firebase';
import React, { Component } from 'react';
import recipes from './models/recipes';
import form from './models/form';
import { observer } from 'mobx-react';
import Header from './Header';
import List from './List';
import Form from './Form';
import FlatButton from 'material-ui/FlatButton';

let styles = {
  button: {
    backgroundColor: '#2A2D30',
    border: 'none',
    color: 'white',
    height: 40,
    width: 100,
    fontSize: 15,
    marginLeft: 20
  }
}

@observer
class App extends Component {
  componentDidMount() {
    var config = {
      apiKey:'API_KEY=AIzaSyACOuQqsT4RlmtaJfwFGd1VLhDjcs86-3I',
      authDomain: "chemistry-cook.firebaseapp.com",
      databaseURL: "https://chemistry-cook.firebaseio.com",
      projectId: "chemistry-cook",
      storageBucket: "chemistry-cook.appspot.com",
      messagingSenderId: "562987349696"
    };
    firebase.initializeApp(config);
    recipes.fetchRecipes();
  }

  renderForm() {
    if(form.toggled) {
      return <Form store={form}/>
    }
  }

  renderButton() {
    let { button } = styles;
    if(form.toggled) {
      return (
        <button onClick={() => form.toggleForm()} style={button}>
          Never Mind
        </button>
      );
    } else {
      return (
        <button onClick={() => form.toggleForm()} style={button}>
          New Recipe
        </button>
      );
    }
  }

  render() {
    let { div, button } = styles;
    return (
      <div>
        <div style={div}>
          <Header text={'Chemistry Cook'}/>
        </div>
        {this.renderButton()}
        <div style={div}>
          {this.renderForm()}
          <List store={recipes} />
        </div>

      </div>
    );
  }
}

export default App;
