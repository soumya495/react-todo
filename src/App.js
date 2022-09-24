import "./App.css";
import { AppContextProvider } from "./AppContext";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lists from "./components/Lists";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Lists />
      <ToastContainer position="top-center" />
    </AppContextProvider>
  );
}

export default App;
