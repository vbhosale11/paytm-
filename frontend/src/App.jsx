import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import {Dashboard} from "./pages/Dashboard";
import {SendMoney} from "./pages/SendMoney";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
