import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='card'>
      <Image />
      <CardBody />
    </div>
  );
}

function Image() {
  return <img src='psycho.jpg' className='image'></img>;
}

function CardBody() {
  return (
    <div className='card-body'>
      <Intro />
      <SkillsList />
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

function SkillsList() {
  return (
    <ul className='skills-list'>
      <Skill name='HTML+CSS 💪' backgroundColor='red' />
      <Skill name='JavaScript 💪' backgroundColor='blue' />
      <Skill name='Web Design ✍️' backgroundColor='grey' />
      <Skill name='Git and Github ✍️' backgroundColor='orange' />
      <Skill name='React 🔥' backgroundColor='brown' />
      <Skill name='Svelte 🔥' backgroundColor='purple' />
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
