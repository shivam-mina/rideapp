import navStyles from "../styles/Navbar.module.css";
import profilePic from "../img/download.jpg";

const Navbar = ({ username, pic }) => {
  return (
    <div className={navStyles.nav}>
      <div className={navStyles.navbar__texts}>
        <div className={navStyles.nav__title}>Edvora</div>
        <div className={navStyles.user}>
          <div className={navStyles.username}>{username}</div>
          <div className={navStyles.img__container}>
            <img src={pic} alt="pic" className={navStyles.userimg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
