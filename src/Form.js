import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import { Card, CardText } from 'material-ui/Card';

let styles = {
  textarea: {
    borderColor: '#2A2D30',
    borderWidth: 5,
    width: 500,
    height: 100,
    fontSize: 15,
    margin: 10,
    resize: 'none'
  },
  input: {
    borderColor: '#2A2D30',
    borderWidth: 5,
    fontSize: 15,
    width: 500,
    height: 20,
    marginLeft: 10
  },
  warning: {
    fontFamily: 'arial',
    fontSize: 20,
    color: 'red'
  },
  button: {
    backgroundColor: '#2A2D30',
    border: 'none',
    color: 'white',
    height: 40,
    width: 100,
    fontSize: 15,
    margin: 10,
  }
}

@observer
class Form extends Component {
  constructor() {
    super();
    this.onDrop = this.onDrop.bind(this);
  }

  renderFields() {
    let { textarea } = styles;
    return this.props.store.fields.map((field, i) => {
      return (
        <div key={i}>
          <textarea style={textarea}
            placeholder={field}
            value={this.props.store.fieldValues[i]}
            onChange={(event) => {
              this.props.store.changeFieldValues(i, event.target.value);
            }}>
          </textarea>
        </div>
        );
    });
  }

  renderIngriedents() {
    let { input, button } = styles
    return this.props.store.ingriedents.map((ingriedent, i) => {
      return (
        <h5 key={i}>
          <input
            style={input}
            placeholder="ingredent ex: 1 cup sugar"
            value={this.props.store.ingriedents[i]}
            onChange={(event) => {
              this.props.store.changeIngredient(i, event.target.value)
            }}
          />
          <button
            onClick={() => this.props.store.removeIngredient(i)}
            style={button}>
            Remove
          </button>
        </h5>
      );
    });
  }

  renderSteps() {
    const { textarea, button } = styles
    return this.props.store.steps.map((step, i) => {
      return (
        <div key={i}>
          <textarea
            style={textarea}
            placeholder="step"
            value={this.props.store.steps[i]}
            onChange={(event) => {
              this.props.store.changeStep(i, event.target.value)
            }}>
          </textarea>
          <br/>
          <button onClick={() => this.props.store.removeStep(i)} style={button}>
              Remove
          </button>
        </div>
      );
    });
  }

  renderErrors() {
    let { warning, button } = styles;
    if(this.props.store.errors.length > 0) {
      return this.props.store.errors.map((error, i) => {
        return (
          <h5 key={i} style={warning} >{error}</h5>
        );
      });
    } else {
      return <button
        onClick={() => this.props.store.createRecipe()}
        style={button}>
        Add Recipe
      </button>;
    }
  }

  onDrop(files) {
    console.log(files);
    this.props.store.setPicture(files[0]);
  }

  renderPicture() {
    if(this.props.store.picture !== '') {
      return <img src={this.props.store.picture.preview} />;
    }
  }

  render() {
    let { input, button, line } = styles
    return (
      <div style={{ width:600, marginLeft: 20 }}>
        <Card>
          <CardText>
            <input
              style={input}
              placeholder="title"
              value={this.props.store.title}
              onChange={(event) => this.props.store.changeTitle(event.target.value)}
            />
            {this.renderFields()}
            <button onClick={() => this.props.store.addIngrdient()} style={button}>
              Add ingredient
            </button>
            <br/>
            {this.renderIngriedents()}
            <button onClick={() => this.props.store.addStep()} style={button}>
              Add Step
            </button>
            {this.renderSteps()}
            <br/>
            <Dropzone
               multiple={false}
               accept="image/*"
               onDrop={this.onDrop}>
               <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
            {this.renderPicture()}
            {this.renderErrors()}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default Form;
