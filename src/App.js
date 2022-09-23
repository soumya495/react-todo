import { useState } from "react";
import "./App.css";
import { AppContextProvider } from "./AppContext";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lists from "./components/Lists";

function App() {
  const [listModal, setListModal] = useState(false);

  return (
    <AppContextProvider>
      <Header listModal={listModal} setListModal={setListModal} />
      <Lists />
      <ToastContainer position="top-center" />
    </AppContextProvider>
  );
}

export default App;
