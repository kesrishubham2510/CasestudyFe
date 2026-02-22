import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContextProvider from "./context/AppContext";

import PageTemplate from "./page/pagetemplate/PageTemplate";
import Stats from "./page/stats/Stats";
import Welcome from "./page/welcome/Welcome";
import Comparision from "./page/comparision/Comparision";
import NotFound from "./page/notfound/NotFound";
import CovidInfo from "./page/static/CovidInfo";

function App() {

  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PageTemplate component={<Welcome />}></PageTemplate>}
          />
          <Route
            path="/stats"
            element={<PageTemplate component={<Stats />}></PageTemplate>}
          />
          <Route
            path="/comparision"
            element={<PageTemplate component={<Comparision />}></PageTemplate>}
          />
          <Route
            path="/covid-info"
            element={<PageTemplate component={<CovidInfo />}></PageTemplate>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
