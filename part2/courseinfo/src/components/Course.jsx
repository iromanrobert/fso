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
  return (
    <ul>
      {parts.map((part) => {
        return <Part key={part.id} coursePart={part} />;
      })}
    </ul>
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
