import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@mui/material";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { Store } from "./Store";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      paper: "#ffffff", // Replace with your desired background color
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/store" component={Store} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
