import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from '../Dashboard';
import Testpage from '../Testpage';
import Listpage from '../Listpage';
import Reminderpage from '../Reminderpage'
import Accountpage from '../Accountpage'
import Settingpage from '../Settingpage'
import HelpToUsepage from '../HelpToUsepage'






const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='../Dashboard' element={<DashBoard />}/>
            <Route path='../test/Testpage' element={<Testpage />} />
            <Route path='../list/Listpage' element={<Listpage />} />
            <Route path='../reminder/Reminderpage' element={<Reminderpage />} />
            <Route path='../account/Accountpage' element={<Accountpage />} />
            <Route path='../setting/settingpage' element={<Settingpage />} />
            <Route path='../HelpToUse/HelpToUsepage' element={<HelpToUsepage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;