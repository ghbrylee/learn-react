import logo from './logo.svg';
import './App.css';
import any from './images/any.jpeg'
import RouterPage from './components/RouterPage'

function App() {
  return (
    <div className="App">
      <img src={any} width="100%" />
      <RouterPage/>
    </div>
  );
}

export default App;
