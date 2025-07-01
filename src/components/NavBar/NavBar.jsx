import { NavLink } from "react-router";
import s from "./NavBar.module.css";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { openLogInModal, openRegisterModal } from "../../redux/modal/slice";
import { selectIsAuth } from "../../redux/auth/selectors";
import { logoutUser } from "../../firebase/auth/auth";
import {clearUser} from "../../redux/auth/slice";




const NavBar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const handleLogout = async () => {
    await logoutUser(); 
    dispatch(clearUser()); 
  };
  

  return (
    <header className={s.header}>
<div className={s.logoBox}>
          <svg className={s.svg}>
          <use href={"/symbol-defs.svg#icon-ukraine"} />
          </svg>
  <p className={s.logo}>LearnLingo</p>
</div>

      <nav className={s.nav}>
        <NavLink to="/" className={s.link}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={s.link}>
          Teachers
        </NavLink>
        {isAuth && <NavLink to="/favorite" className={s.link}>Favorites</NavLink>}  
      </nav>
      {!isAuth ? (
  <div className={s.btnBox}>
    <button className={s.logBtn} onClick={() => dispatch(openLogInModal())}>
      <FiLogIn className={s.icon} /> Log In
    </button>
    <button className={s.regBtn} onClick={() => dispatch(openRegisterModal())}>
      Registration
    </button>
  </div>
) : (
  <button className={s.logBtn} onClick={handleLogout}>
    <FiLogIn className={s.icon} /> Log Out
  </button>
)}

    </header>
  );
};

export default NavBar;
