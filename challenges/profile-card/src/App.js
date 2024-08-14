import './App.css';

const skills = [
  {
    title: 'HTML+CSS',
    level: 'intermediate',
    color: 'red',
  },
  {
    title: 'React',
    level: 'beginner',
    color: 'blue',
  },
  {
    title: 'JavaScript',
    level: 'intermediate',
    color: 'orangered',
  },
  {
    title: 'Angular',
    level: 'intermediate',
    color: 'grey',
  },
  {
    title: 'Git and Github',
    level: 'intermediate',
    color: 'pink',
  },
];

function App() {
  return (
    <div className='card'>
      <Image />
      <CardBody />
    </div>
  );
}

function Image() {
  return <img src='psycho.jpg' className='image' alt='Psycho'></img>;
}

function CardBody() {
  return (
    <div className='card-body'>
      <Intro />
      <Skills />
    </div>
  );
}

function Intro() {
  return (
    <div>
      <h1 className='intro__name'>Konrad Pękala</h1>
      <p>
        Full-stack web developer and teacher at Udemy. When not coding or
        preparing a course, I like to play board games. to cook (and eat), or to
        just enjoy the Portuguese sun at the beach.
      </p>
    </div>
  );
}

function Skills() {
  const emojiMap = {
    beginner: '👶',
    intermediate: '🖥️',
    advanced: '🥷',
  };
  return (
    <ul className='skills-list'>
      {skills.map((skill) => (
        <Skill
          name={skill.title + ' ' + emojiMap[skill.level]}
          backgroundColor={skill.color}
        />
      ))}
    </ul>
  );
}

function Skill(props) {
  return (
    <li className='skill' style={{ backgroundColor: props.backgroundColor }}>
      {props.name}
    </li>
  );
}

export default App;
