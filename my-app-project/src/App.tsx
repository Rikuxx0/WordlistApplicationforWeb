import * as React from 'react'
import Header from './components/Header'
//React Routingのセット
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard.tsx';
import Testpage from './components/Testpage.tsx';
import Listpage from './components/Listpage.tsx';
import Reminderpage from './components/Reminderpage.tsx';
import Accountpage from './components/Accountpage.tsx';
import Settingpage from './components/Settingpage.tsx';
import HelpToUsepage from './components/HelpToUsepage.tsx';
import Nopage from './components/Nopage.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />

        { /*React Router*/ }
          <Routes>
              <Route path='/components/Dashboard.tsx' element={<Dashboard />}/>
              <Route path='/components/Testpage.tsx' element={<Testpage />} />
              <Route path='/components/Listpage.tsx' element={<Listpage />} />
              <Route path='/components/Reminderpage.tsx' element={<Reminderpage />} />
              <Route path='/components/Accountpage.tsx' element={<Accountpage />} />
              <Route path='/components/settingpage.tsx' element={<Settingpage />} />
              <Route path='/components/HelpToUsepage.tsx' element={<HelpToUsepage />} />
              <Route path='/components/Nopage.tsx' element={<Nopage />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;

