import { NavLink } from "react-router";
import s from "./NavBar.module.css";


// const buildLinkClass = ({ isActive }) => {
//   return clsx(s.link, isActive && s.active);
// };

const NavBar = () => {
  return (
    <header className={s.header}>
        <div>
      <p>LearnLingo</p>
      </div>
      <nav className={s.nav}>
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/teachers" >
          Teachers
        </NavLink>
      </nav>
      <div>
        <button>Log In</button>
        <button>Registration</button>
      </div>
    </header>
  );
};

export default NavBar;
