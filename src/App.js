import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Common/Navbar';
import CreateTechPack from './Pages/CreateTechPack';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Registration from './Components/Registration';
import Login from './Components/Login';
import LoginPage from './Pages/LoginPage';
import Cookies from 'js-cookie';
import MyWork from './Pages/MyWork';
import Home from './Pages/Home';

function App() {
  const isSignedIn = Cookies.get('isSignedIn')

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Navbar isSignedIn={isSignedIn} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/create-techpack" element={<CreateTechPack />} />
            <Route path='/my-work' element={<MyWork />} />
            <Route path='/new-user' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user-login' element={<LoginPage />} />
          </Routes>
        </Router>
      </DndProvider>
    </>
  );
}

export default App;
