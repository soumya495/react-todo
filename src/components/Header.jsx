import { SiTodoist } from "react-icons/si";
import { HiOutlinePlus } from "react-icons/hi";
import AddList from "./AddList";
import { useContext } from "react";
import AppContext from "../AppContext";

function Header() {
  const { setListModal } = useContext(AppContext);

  return (
    <>
      <nav>
        <div className="container container-nav">
          <a href="/" className="logo">
            <SiTodoist fill="#f0ffff" fontSize="1.5rem" />
            <p>Todo</p>
          </a>
          <button className="btn btn-nav" onClick={() => setListModal(true)}>
            <HiOutlinePlus fill="#f0ffff" fontSize="1.25rem" />
            <p>New List</p>
          </button>
        </div>
      </nav>
      <AddList />
    </>
  );
}

export default Header;
