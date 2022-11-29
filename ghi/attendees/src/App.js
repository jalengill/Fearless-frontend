import logo from './logo.svg';
import './App.css';

function App(props) {
  return (
    <div>
      Number of attendees: {props.attendees.length ** 4}
    </div>
  );
}

export default App;
