const course = 'Half Stack application development'
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14

const Header = ({courseName}) => {
  return (
    <h1>
      {courseName}
    </h1>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Content = () => {
  return (
    <>
    <Part part={part1} exercise={exercises1} />
    <Part part={part2} exercise={exercises2} />
    <Part part={part3} exercise={exercises3} />
    </>
  )
}


const Total = ({exercises}) => {
  let sum = 0;

  exercises.forEach((exercise) => {
    sum = sum + exercise
  })
  
  return (
    <p>Number of exercises {sum}</p>
  )
}


const App = () => {
  
  return (
    <div>
      <Header courseName={course}/>
      <Content />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App