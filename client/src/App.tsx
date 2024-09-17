// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
// import Home from "./pages/Home";
import './App.css';

const App = () => {
  return (
    // <Router>
      <div className="App">
        <Header />
        {/* <Routes>
          <Route path="/" element={<Home />} />
        </Routes> */}
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    // </Router>
  );
};

export default App;
