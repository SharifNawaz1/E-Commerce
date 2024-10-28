import  { React } from "react";
import { Link ,useNavigate} from "react-router-dom";
const Nav=()=>{
    let auth = localStorage.getItem('user')
    const navigate = useNavigate();
    const logout = ()=>{
         auth = localStorage.clear()
         navigate("/signup")
      }
    return(
        <div>
            <ul className="nav-ul">
            {auth ?<>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li> <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).user.name})</Link></li></>
                :
                 <><li><Link to="/signup">SignUp</Link> <Link to="/login">Login</Link></li> </>
            }
            </ul>
        </div> 
    )
}

export default Nav;