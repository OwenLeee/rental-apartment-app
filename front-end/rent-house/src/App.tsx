import React from 'react';
import MenuBar from './components/MenuBar';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/store';
// import HomePage from './components/HomePage'; 


const App: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <MenuBar />
      {/* <HomePage />  */}

    </ConnectedRouter>

  );
}

export default App;
