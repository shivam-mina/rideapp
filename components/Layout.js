import styles from "../styles/Layout.module.css";
import Navbar from "./Navbar";
import Options from "../components/Options";
const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.inside}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
