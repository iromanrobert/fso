import useState from "react";

const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Part = ({ coursePart }) => {
  return (
    <li>
      {coursePart.name} {coursePart.exercises}
    </li>
  );
};

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <ul>
        {parts.map((part) => {
          return <Part key={part.id} coursePart={part} />;
        })}
      </ul>
      <p>Total: {total}</p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
