import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mb: 3 }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
