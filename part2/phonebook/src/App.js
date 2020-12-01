import React, { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import pbServices from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newNotification, setNotification ] = useState(null)
  const [ newClassName, setClassName ] = useState('notification')
  
  const addPerson = (event) => {
    event.preventDefault()
    const index = persons.map(p => p.name).indexOf(newName)
    if (index !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        pbServices.update(persons[index].id, {...persons[index], number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
          })
          .catch(error => {
            setClassName('error')
            setNotification(`Information of ${persons[index].name} has already been removed from server`)
            setPersons(persons.filter(p => p.id !== persons[index].id))            
            setTimeout(() => {
              setNotification(null)
            }, 5000) 
          })
          return
      }
    }
    const newObject = { 
      name: newName, 
      number: newNumber
    }
    pbServices
      .create(newObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setClassName('notification')
        setNotification(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
         setTimeout(() => {
          setNotification(null)
        }, 5000)        
      })
      .catch(error => {console.log(error)})
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  
  useEffect(() => {
    pbServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleClick = (name, id) => {
    /* good example for a promise chain */
    if (window.confirm(`Delete ${name}?`)) {
      pbServices
        .deletePerson(id) /* a promise */
        .then(response => pbServices.getAll())
        .then(deletedPersons => setPersons(deletedPersons))
        .catch(error => console.log(error))
  }}

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification className={newClassName} message={newNotification}/>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        newFilter={newFilter}
        handleClick={handleClick}
      />
    </div>
  )
}


export default App