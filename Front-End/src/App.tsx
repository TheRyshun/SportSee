import Header from './components/Header';
import "../sass/style.scss";
import Sidebar from './components/Panel';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

const App = () => {

  return (
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<Sidebar />} />
      </Routes>
    </Router>
  )
}

export default App;
