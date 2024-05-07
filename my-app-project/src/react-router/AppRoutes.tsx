import { BrowserRouter, Routes , Route } from "react-router-dom";
import App from "../App.tsx";
import Testpage from '../Testpage.tsx';
import Listpage from '../Listpage.tsx';
import Reminderpage from '../Reminderpage.tsx'
import Accountpage from '../Accountpage.tsx'
import Settingpage from '../Settingpage.tsx'
import HelpToUsepage from '../HelpToUsepage.tsx'







const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}/>
            <Route path='../test/Testpage.tsx' element={<Testpage />} />
            <Route path='../list/Listpage.tsx' element={<Listpage />} />
            <Route path='../reminder/Reminderpage.tsx' element={<Reminderpage />} />
            <Route path='../account/Accountpage.tsx' element={<Accountpage />} />
            <Route path='../setting/settingpage.tsx' element={<Settingpage />} />
            <Route path='../HelpToUse/HelpToUsepage.tsx' element={<HelpToUsepage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;