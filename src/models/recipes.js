import { observable, action, computed } from 'mobx';
import firebase from 'firebase';

class Recipes {
  @observable recipes = false;
  @observable expanded = [];
  @observable images = [];

  constructor() {
    this.expand = this.expand.bind(this);
  }

  @action
  fetchRecipes() {
    let ref = firebase.database().ref('recipes/');
    ref.on('value', (snapshot) => {
      let array = [];
      snapshot.forEach((data) => {
        array.push(data.val());
        this.expanded.push(false);
        let ref = firebase.storage().ref(`images/${data.val().picture}`);
        ref.getDownloadURL().then(url => {
          this.images.push(url)
        }).catch(err => this.images.push(false));
      });
      this.recipes = array;
    });
  }

  getScienceData(object) {
    let scienceInfo = [];
    for(let key in object) {
      if(key !== 'title' || key !== 'description' ||
        key !== 'ingredience' || key !== 'steps') {
        scienceInfo.push(object[key]);
      }
    }
    return scienceInfo;
  }

  @action
  expand(index) {
    this.expanded[index] = !this.expanded[index];
  }
}

let recipes = new Recipes();
export default recipes;
