import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/home";
import Product from "./app/product";
import Feature from "./app/feature";
import Integration from "./app/integration";
import Pricing from "./app/pricing";
import CaseStudy from "./app/casestudy";
import Contact from "./app/contact";
import About from "./app/about";
import SignIn from "./app/signin";
import SignUp from "./app/signup";
import LifetimeDealBanner from "./components/lifebanner";
import ScrollToTopButton from "./components/ScrollToTopButton";
function App() {
  return (
    <BrowserRouter>
      <div style={{ paddingBottom: "88px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/feature" element={<Feature />} />
                <Route path="/integration" element={<Integration />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/casestudy" element={<CaseStudy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
      </div>
      <LifetimeDealBanner />
      <ScrollToTopButton />
    </BrowserRouter>
  );
}

export default App;
