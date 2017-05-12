import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Recipe from './Recipe';

let styles = {
  line: {
    borderWidth: 3,
    borderColor: '#2A2D30',
    borderStyle: 'solid',
    marginTop: 100
  }
}

@observer
class List extends Component {
  renderList() {
    return this.props.store.recipes.map((recipe, i) => {
      return <Recipe
        key={i}
        recipe={recipe}
        science={this.props.store.getScienceData(recipe)}
        images={this.props.store.images}
        index={i}
        expanded={this.props.store.expanded[i]}
        expand={this.props.store.expand}
      />;
    });
  }

  render() {
    let { text } = styles
    if(!this.props.store.recipes) {
      return <h1>Loading...</h1>
    } else if(this.props.store.recipes.length === 0) {
      return <h1>There are no recipes</h1>
    } else {
      this.renderList();
      return (
        <div>
          {this.renderList()}
        </div>
      );
    }
  }
}

export default List;
