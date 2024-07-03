import { NativeBaseProvider } from "native-base";

import Home from "./pages/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApoliceEdit from "./components/ApoliceEdit";

export default function App() {
  return (
    <NativeBaseProvider>
      <div style={{ background: "#3ea110", display: "flex", height: "auto" }}>
        {/* <Home /> */}
        <Router>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/apolices/:id" Component={ApoliceEdit} />
          </Routes>
        </Router>
      </div>
    </NativeBaseProvider>
  );
}
