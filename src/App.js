import './App.css';
import Trainings from './components/Trainings/Trainings';
import Customers from './components/Customers/Customers';
import Calendarlist from './components/Calendar/Calendarlist';
import Home from './components/Home';
import NotFound from './components/NotFound';
import {  BrowserRouter,  Routes,  Route,  Link} from 'react-router-dom';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Button style={{margin: 10}} variant="outlined" component={Link} to={'/'}>Home</Button>
        <Button style={{margin: 10}} variant="outlined" component={Link} to={'/trainings'}>Trainings</Button>
        <Button style={{margin: 10}} variant="outlined" component={Link} to={'/customers'}>Customers</Button>
        <Button style={{margin: 10}} variant="outlined" component={Link} to={'/calendarlist'}>Training calendar</Button>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/calendarlist" element={<Calendarlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
