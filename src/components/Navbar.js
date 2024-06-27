// import { Outlet} from "react-router-dom";
import './Navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate("/home");
  }
  const search = () => {
    navigate("/search");
  }
  const create = () => {
    navigate("/create");
  }
  const profile = () => {
    fetch('http://localhost:8080/checkloggedin', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
  }).then((response) => {
      if (response.ok) {
      // alert("Login successful!");
      return response.json();
      } else {
      // alert("Login failed. Please try again.");
      throw new Error('Not logged in');
      }
  }).then((data) => {
      console.log("data recieved:",data);
      navigate(`/profile/${data.id}`);
      
  }).catch((error) => {
      console.error('Error:', error);
  });
  }

  return (
    <>
      <nav className="mobile-nav">
          <button className="bloc-icon" onClick={home}>
            <img src="/navbar/home.svg" alt=""/>
          </button>
          <button className="bloc-icon">
            <img src="ressources/heart.svg" alt=""/>
          </button>
          <button className="bloc-icon" onClick={create}>
            <img src="/navbar/plus.svg" alt=""/>
          </button>
          <button className="bloc-icon" onClick={search}>
            <img src="/navbar/magnifying-glass.svg" alt=""/>
          </button>
          <button className="bloc-icon" onClick={profile}>
            <img src = "/navbar/profile3.svg" alt=""/>
          </button>
      </nav>
      {/* <Outlet /> */}
    </>
  )
};

export default Navbar;