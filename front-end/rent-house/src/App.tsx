import React from 'react';
import MenuBar from './components/MenuBar';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/store';


const App: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <MenuBar />
    </ConnectedRouter>

  );
}

export default App;
