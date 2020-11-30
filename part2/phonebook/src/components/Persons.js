import React from "react"
const Person = ({name, number}) => <p>{name} {number}</p>

const Persons = ({persons, newFilter}) => { 
  const filtered = persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
  <div>
    {filtered.map(p => <Person key={p.name} name={p.name} number={p.number}/>)}
  </div>
)}

export default Persons