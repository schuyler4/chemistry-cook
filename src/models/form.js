import { observable, action, computed } from 'mobx';
import firebase from 'firebase';
import randomId from 'random-id';

class Form {
  @observable toggled = false;
  @observable title = '';
  @observable fieldValues = [];
  @observable ingriedents = [];
  @observable steps = [];
  @observable picture = '';
  @observable pictureId = '';

  @computed
  get fields() {
    return [
      'description',
      'classification of matter',
      'chemical and physical properties',
      'chemical and physical changes',
      'density',
      'states of matter and temperature',
      'phase changes',
      'kinetic molecular theory of gases',
      'heat transfer',
      'atomic structure',
      'chemical bonding',
      'chemical reactions',
      'energy in reactions',
      'scientific practices'
    ]
  }

  constructor() {
    this.changeTitle = this.changeTitle.bind(this);

    for(let _ of this.fields) {
      this.fieldValues.push('');
    }
  }

  @action
  toggleForm() {
    this.toggled = !this.toggled;
  }

  @action
  changeTitle(newTitle) {
    this.title = newTitle;
  }

  @action
  changeFieldValues(index, text) {
    this.fieldValues[index] = text;
  }

  @action
  addIngrdient() {
    this.ingriedents.push('');
  }

  @action
  changeIngredient(index, newText) {
    this.ingriedents[index] = newText;
  }

  @action
  removeIngredient(index) {
    this.ingriedents.splice(index, 1);
  }

  @action
  addStep() {
    this.steps.push('');
  }

  @action
  changeStep(index, newText) {
    this.steps[index] = newText;
  }

  @action
  removeStep(index) {
    this.steps.splice(index, 1);
  }

  @action
  setPicture(picture) {
    this.picture = picture;
    this.pictureId = randomId(7);
  }

  @computed
  get errors() {
    let errors = [];
    if(this.title === '') {
      errors.push('title is missing!')
    }
    this.fieldValues.forEach((value, i) => {
      if(value === '') {
        errors.push(`${this.fields[i]} is missing!`);
      }
    });
    return errors;
  }

  @computed
  get data() {
    let object = { title: this.title };
    this.fields.forEach((field, i) => object[field] = this.fieldValues[i]);
    object.picture = this.pictureId;
    object.ingriedents = this.ingriedents.map(ingriedent => ingriedent);;
    object.steps = this.steps.map(step => step);
    return object;
  }

  @action
  reset() {
    this.toggled = false;
    this.title = '';
    this.fieldValues.forEach((_, i) => this.fieldValues[i] = '');
    this.ingriedents = [];
    this.steps = [];
  }

  uploadPicture() {
    if(this.picture !== '') {
      let ref = firebase.storage().ref().child(`images/${this.pictureId}`);
      ref.put(this.picture);
    }
  }

  @action
  createRecipe() {
    firebase.database().ref(`recipes/${this.title}`).set(this.data);
    this.uploadPicture();
    this.reset();
  }
}

let form = new Form();
export default form;
