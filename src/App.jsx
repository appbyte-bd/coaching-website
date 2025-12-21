
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";


import Navbar from "./components/navbar"
import Home from "./pages/home";
import Courses from "./pages/courses";
import Admission from "./pages/admission";
import Result from "./pages/result.jsx";
import Contact from "./pages/contact";



const main = () => {
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/result" element={<Result />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<h1>Nothing Found </h1>} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  )
}
export default main;