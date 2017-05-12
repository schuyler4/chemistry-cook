import React, { Component } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import { observer } from 'mobx-react';

const styles = {
  button: {
    backgroundColor: '#2A2D30',
    border: 'none',
    color: 'white',
    height: 40,
    width: 100,
    fontSize: 15,
    margin: 2
  },
  size: {
    width: 605,
    padding: 10
  }
}

@observer
class Recipe extends Component {
  constructor() {
    super();
    this.state = { expanded: false };
  }

  renderImage() {
    let { size } = styles
    if(this.props.images.length - 1 >= this.props.index) {
      return (
        <CardMedia>
          <div style={{width: 500}}>
            <img src={this.props.images[this.props.index]} style={{width:580, margin: 10}} />
          </div>
        </CardMedia>
      )
    }
  }

  renderExpandButton() {
    if(!this.props.expanded) {
      return <button
        style={styles.button}
        onClick={() => this.props.expand(this.props.index)}>
        Expand
      </button>
    }
  }

  renderIngredients() {
    if(this.props.recipe.ingriedents) {
      return (
        <div>
          <h3>Ingriedents</h3>
          <ul>
            {
              this.props.recipe.ingriedents.map((ingriedent, i) => {
                return <li key={i}>{ingriedent}</li>;
              })
            }
          </ul>
        </div>
      )
    }
  }

  renderSteps() {
    if(this.props.recipe.steps) {
      return (
        <div>
          <h3>Instructions</h3>
          <ol>
            {
              this.props.recipe.steps.map((step, i) => {
                return <li key={i}>{step}</li>
              })
            }
          </ol>
        </div>
      )
    }
  }

  renderScience() {
    let scienceArray = [];
    for(let key in this.props.recipe) {
      if(key !== 'title'
        && key !== 'description'
        && key !== 'ingriedents'
        && key !== 'steps'
        && key !== 'picture') {
        scienceArray.push(
          <div key={key} >
            <h3>{key}</h3>
            <p>{this.props.recipe[key]}</p>
          </div>
        );
      }
    }
    return scienceArray
  }

  renderExpand() {
    if(this.props.expanded) {
      let { button } = styles;
      let { expand, recipe } = this.props;
      return (
        <div>
          <CardText>
            {this.renderIngredients()}
            {this.renderSteps()}
            {this.renderScience()}
          </CardText>
          <CardActions>
            <button style={button} onClick={() => expand(this.props.index)}>
              Contrast
            </button>
          </CardActions>
        </div>
      );
    }
  }

  render() {
    let { description, title } = this.props.recipe;
    let { size } = styles
    return (
      <div style={Object.assign(size, { margin: 10 })}>
        <Card>
          {this.renderImage()}
          <CardTitle title={title} />
          <CardText>{ description }</CardText>
          <CardActions>
            {this.renderExpandButton()}
          </CardActions>
          {this.renderExpand()}
        </Card>
      </div>
    );
  }
}

export default Recipe;
