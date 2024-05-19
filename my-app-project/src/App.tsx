import * as React from 'react'
import Header from './components/Header'
//React Routingのセット
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Testpage from './components/Testpage';
import Listpage from './components/Listpage.tsx';
import Reminderpage from './components/Reminderpage';
import Accountpage from './components/Accountpage';
import Settingpage from './components/Settingpage';
import HelpToUsepage from './components/HelpToUsepage';
import Nopage from './components/Nopage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />

        { /*React Router*/ }
          <Routes>
              <Route path='/' element={<Dashboard />}/>
              <Route path='/Dashboard' element={<Dashboard />}/>
              <Route path='/Testpage' element={<Testpage />} />
              <Route path='/Listpage' element={<Listpage />} />
              <Route path='/Reminderpage' element={<Reminderpage />} />
              <Route path='/Accountpage' element={<Accountpage />} />
              <Route path='/settingpage' element={<Settingpage />} />
              <Route path='/HelpToUsepage' element={<HelpToUsepage />} />
              <Route path='*' element={<Nopage />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;

