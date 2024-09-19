import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/Home";


const App = () => {
  return (
      <div className="App">
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
  );
};

export default App;
