import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <Dashboard />
      <Toaster />
    </>
  );
}

export default App;
