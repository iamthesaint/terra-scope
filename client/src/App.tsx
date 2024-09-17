// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/Home";
import './App.css';

const App = () => {
 return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
