
import CreateTest from './pages/CreateSomeTest/TestSetup';
import OurTest from './pages/OurTest/OurTest';
import { Wizard, useWizard } from 'react-use-wizard';
import Steps1 from './pages/Steps/Steps1';
import Steps2 from './pages/Steps/Steps2';
import './App.css';

function App() {
  return (
    <div className="App">

      <Wizard>
        <CreateTest />
        <OurTest />
        
      </Wizard>



    </div>
  );
}

export default App;
