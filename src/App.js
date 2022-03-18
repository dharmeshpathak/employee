import { useEffect, useState } from 'react';
import Router from "Routes/Router";
import './App.css';

import { BrowserRouter } from 'react-router-dom';
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
        
        <Router login={login} setUpLogin={setUpLogin} />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
