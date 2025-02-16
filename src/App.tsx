import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <Navbar/>
      <div className="login-container">
      <Login />
      </div>
    </>
  )
}

export default App;
