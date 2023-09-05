import { Wizard } from 'react-use-wizard';

import CreateTest from './pages/CreateSomeTest/TestSetup';
import OurTest from './pages/CurentTest/OurTest';

import './App.css';

function App() {
  return (
    <div className="App">
      <Wizard>
        <CreateTest />
        <OurTest/>
      </Wizard>
    </div>
  );
}

export default App;
