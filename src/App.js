import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import AddUser from "./pages/adduser";
import Alluser from "./pages/alluser";
import NoPage from "./pages/nopage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="edituser/:id" element={<AddUser />} />
          <Route path="alluser" element={<Alluser />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
