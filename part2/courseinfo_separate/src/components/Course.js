import React from 'react'

const Header = ({ course }) => {
  return (
    <h3>{course.name}</h3>
  )
}

const Total = ({ course }) => 
  <b>total of {course.parts
    .map(part => part.exercises)
    .reduce((acc, s) => acc + s)} exercises</b>


const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) =>
  course.parts.map(p => <Part key={p.id} part={p}/>)

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default Course