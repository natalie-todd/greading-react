import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'asdfa', name: 'Max', age: 28 },
      { id: 'asddd', name: 'Manu', age: 29 },
      { id: 'tgted', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personsIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personsIndex]
    };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personsIndex] = person;
    this.setState({ persons: persons })
  }

  deletePersonHandler = (personsIndex) => {
    const persons = [...this.state.persons];
    //Splice is not best practice. It can lead to unpredictability.
    persons.splice(personsIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      )
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.App} >
          <h1>Hi, I'm a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button
          className={btnClass}
            onClick={this.togglePersonsHandler} > Toggle Persons</button>
          {persons}
        </div>
    );
  }
}
export default App;
