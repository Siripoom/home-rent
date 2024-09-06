import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page404 from "./pages/Page404";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HeroImage from "./components/HeroImage";
import Contact from "./pages/Accommodation";
import Accommodation from "./pages/Accommodation";
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <HeroImage title="Are you looking for accommodation Krabi?" />
                <Home />
              </>
            }
          />
          <Route
            path="acc"
            exact
            element={
              <>
                <HeroImage title="Accommodation" />
                <Accommodation />
              </>
            }
          />
          <Route
            path="contact"
            exact
            element={
              <>
                <HeroImage title="Contact" />
                <Contact />
              </>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
