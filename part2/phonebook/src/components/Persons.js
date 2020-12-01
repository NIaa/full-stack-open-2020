import React from "react"

const Person = ({name, number, id, handleClick}) => 
  <p>{name} {number} <button onClick={() => handleClick(name, id)}>delete</button></p>

const Persons = ({persons, newFilter, handleClick}) => { 
  const filtered = persons
    .filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
  <div>
    {filtered.map(p => 
      <Person 
        key={p.id} 
        name={p.name} 
        number={p.number} 
        id={p.id} 
        handleClick={handleClick}
      />)}
  </div>
)}

export default Persons