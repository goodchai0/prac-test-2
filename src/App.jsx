import { Route, Routes} from 'react-router-dom';
import './App.css';
import {Home} from './pages/Home/Home';

function App() {
  return (
    <div>
      <Routes>
      <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
