import React, { Component } from 'react';
import './App.css';
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
// set variable personsIndex to the ids of state
    const personsIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
//set variable person to personsIndices
    const person = {
      ...this.state.persons[personsIndex]
    };
//name portion of state will equal event.target.value
    person.name = event.target.value;
//persons will equal entire state object and the index of persons = person
    const persons = [...this.state.persons];
    persons[personsIndex] = person;
//set the state so persons is the new object in state
    this.setState({ persons: persons })
  }

  deletePersonHandler = (personsIndex) => {
    const persons = [...this.state.persons];
    //Splice is not best practice. It can lead to unpredictability.
    persons.splice(personsIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if ( this.state.showPersons ) {
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
      style.backgroundColor = 'red';
    };

  return (
      <div className = 'App' >
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
        <button
          style = {style}
          onClick = { this.togglePersonsHandler } > Toggle Persons</button>
          {persons}
      </div>
    );
  }
}
export default App;
