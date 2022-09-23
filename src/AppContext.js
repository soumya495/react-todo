import { createContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // manage the lists
  const [lists, setLists] = useState(
    localStorage.getItem("lists")
      ? JSON.parse(localStorage.getItem("lists"))
      : []
  );

  // add new list to state and storage
  const addList = (list) => {
    setLists((prev) => [...prev, list]);
    localStorage.setItem("lists", JSON.stringify(lists));
  };

  return (
    <AppContext.Provider
      value={{
        lists,
        addList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
