import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page404 from "./pages/Page404";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HeroImage from "./components/HeroImage";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import HomeRentForm from "./pages/HomeRentForm";
import HomeRentList from "./pages/HomeRentList";
import ContentList from "./pages/Content";
import ContentManage from "./pages/ContentManage";
import RentingPage from "./pages/RentingPage";
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
                <HomeRentList />
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
          <Route
            path="content"
            exact
            element={
              <>
                <HeroImage title="Content" />
                <ContentList />
              </>
            }
          />
          <Route
            path="renting"
            exact
            element={
              <>
                <HeroImage title="Renting" />
                <RentingPage />
              </>
            }
          />

          <Route
            path="about"
            exact
            element={
              <>
                <HeroImage title="About Us" />
                <AboutUs />
              </>
            }
          />
          <Route path="home" element={<HomeRentForm />} />
          <Route path="contentmanage" element={<ContentManage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
