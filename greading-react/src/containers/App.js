import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);
    this.state = {
      persons: [
        { id: 'asdfa', name: 'Max', age: 28 },
        { id: 'asddd', name: 'Manu', age: 29 },
        { id: 'tgted', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false
    };
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

componentDidMount() {
  console.log('[App.js] Inside componentDidMount()');
}

  // state = {
  //   persons: [
  //     { id: 'asdfa', name: 'Max', age: 28 },
  //     { id: 'asddd', name: 'Manu', age: 29 },
  //     { id: 'tgted', name: 'Stephanie', age: 26 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // }

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
    console.log('[App.js] Inside render()');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }

    return (
      <div className={classes.App} >
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
}
export default App;
