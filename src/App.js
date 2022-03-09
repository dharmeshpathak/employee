import { useEffect, useState } from 'react';
import Router from "../src/Routes/Router";
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import NewNavbar from './components/Navbar/NewNavbar';
function App() {
  const [login, setLogin] = useState(false);
  const setUpLogin = async () => {
    const user = await localStorage.getItem('userItem');
    if (user === null) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  useEffect(() => {
    setUpLogin();
  });
  return (
    <div className='main'>
      <BrowserRouter>
        <NewNavbar login={login} setUpLogin={setUpLogin} >
        <Router login={login} setUpLogin={setUpLogin} />
        </NewNavbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
