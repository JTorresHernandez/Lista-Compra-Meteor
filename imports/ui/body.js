import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks

        if(instance.state.get('check-fruteria')) {
          return Tasks.find({$and: [{ checked:{$ne: true}, seccion:{ $eq:"Fruteria"}}]}, {sort: {checked: 1, createdAt: -1}});
        }
        else if(instance.state.get('check-congelados')) {
          return Tasks.find({$and: [{checked: {$ne: true}, seccion: {$eq:"Congelados"}}]}, {sort: {checked:1, createdAt: -1}});
        }
        else if(instance.state.get('check-carniceria')) {
          return Tasks.find({$and: [{checked: {$ne: true}, seccion: {$eq:"Carniceria"}}]}, {sort: {checked:1, createdAt: -1}});
        }
        else if(instance.state.get('check-vinoteca')){
          return Tasks.find({$and: [{checked: {$ne: true}, seccion: {$eq:"Vinoteca"}}]}, {sort: {checked:1, createdAt: -1}});
        }
        else if(instance.state.get('check-todos')){
        return Tasks.find({ checked: { $ne: true }}, { sort: { checked: 1 , createdAt: -1} });
        }
        else{
        return Tasks.find({ checked: { $ne: true } }, { sort: { checked:1, createdAt: -1 } });
        }
      }
        else {
          if(instance.state.get('check-fruteria')) {
            return Tasks.find({seccion: {$eq:"Fruteria"}}, {sort:{checked:1, createdAt: -1}});
          };
          if(instance.state.get('check-congelados')) {
            return Tasks.find({seccion: {$eq:"Congelados"}}, {sort:{checked:1, createdAt: -1}});
          };
          if(instance.state.get('check-carniceria')){
            return Tasks.find({seccion: {$eq:"Carniceria"}}, {sort: {checked: 1, createdAt: -1}});
          };
          if(instance.state.get('check-vinoteca')){
            return Tasks.find({seccion: {$eq:"Vinoteca"}}, {sort: {checked: 1, createdAt: -1}});
          };
          if(instance.state.get('check-todos')){
            return Tasks.find({}, {sort: {checked: 1, createdAt: -1}});
      };

    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  }},

});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    const cantidad = target.cantidad.value;
    const seccion = target.seccion.value;

    // Insert a task into the collection
   Meteor.call('tasks.insert', text, cantidad, seccion);

    // Clear form
    target.text.value = '';
    target.cantidad.value = 0;
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
'change .check-todos input'(event, instance) {
instance.state.set('check-todos' , event.target.checked);
instance.state.set('check-congelados' , false);
instance.state.set('check-carniceria' , false);
instance.state.set('check-vinoteca' , false);
instance.state.set('check-fruteria' , false);

},
'change .check-fruteria input'(event, instance) {
instance.state.set('check-todos' , false);
instance.state.set('check-congelados' , false);
instance.state.set('check-carniceria' , false);
instance.state.set('check-vinoteca' , false);
instance.state.set('check-fruteria' , event.target.checked);

},
'change .check-carniceria input'(event, instance) {
instance.state.set('check-todos' , false);
instance.state.set('check-congelados' , false);
instance.state.set('check-carniceria' , event.target.checked);
instance.state.set('check-vinoteca' , false);
instance.state.set('check-fruteria' , false);

},
'change .check-congelados input'(event, instance) {
instance.state.set('check-todos' , false);
instance.state.set('check-congelados' , event.target.checked);
instance.state.set('check-carniceria' , false);
instance.state.set('check-vinoteca' , false);
instance.state.set('check-fruteria' , false);

},
'change .check-vinoteca input'(event, instance) {
instance.state.set('check-todos' , false);
instance.state.set('check-congelados' , false);
instance.state.set('check-carniceria' , false);
instance.state.set('check-vinoteca' , event.target.checked);
instance.state.set('check-fruteria' , false);

}





});
