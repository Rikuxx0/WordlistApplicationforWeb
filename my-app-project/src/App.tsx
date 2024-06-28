import * as React from 'react'
import Header from './components/Header.tsx'
//React Routingのセット
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pagecomponents/Dashboard.tsx';
import Testpage from './pagecomponents/Testpage.tsx';
import Listpage from './pagecomponents/Listpage.tsx';
import Reminderpage from './pagecomponents/Reminderpage.tsx';
import Accountpage from './pagecomponents/Accountpage.tsx';
import Settingpage from './pagecomponents/Settingpage.tsx';
import HelpToUsepage from './pagecomponents/HelpToUsepage.tsx';
import Nopage from './pagecomponents/Nopage.tsx';
import Exampage  from './pagecomponents/Exampage.tsx';

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
              <Route path='/Exampage' element={<Exampage />} />
              <Route path='*' element={<Nopage />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;

