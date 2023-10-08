
import { Route, Routes } from 'react-router-dom';
import RoomPage from '../pages/RoomPage';
import './App.css';
import Forms from './components/Forms';

const App = () => {

  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="/:roomId" element={<RoomPage/>} />
        </Routes>
      </div>
    </>
  );
};

export default App
