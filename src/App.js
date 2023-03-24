import './App.css';
import {  Route} from "react-router-dom";
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LoginForm}  />
      <Route exact path="/dashboard" component={Dashboard}  />

    </div>
  );
}

export default App;
