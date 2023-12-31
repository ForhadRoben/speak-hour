
import { Link } from 'react-router-dom';
import logo1 from '../../../assets/logo1.png'
import { AuthContext } from '../../../providers/AuthProvider';
import { useContext } from 'react';
const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navbar =
        <>
            <li><Link to='/'>Home</Link ></li>
            <li><Link to='/instructors'>Instructors</Link></li>
            <li><Link to='/classes'>CLasses</Link></li>
            {/* <li><Link to="/dashboard">Dashboard</Link></li> */}

            {
                user ? <>
                    <li>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                    <li><span><img className='rounded-full ' style={{ height: "40px", width: "40px" }} src={user?.photoURL} alt="" /></span></li>
                    <li>
                        <input type="button" onClick={handleLogOut} value="Log Out" />
                    </li>
                </> : <>
                    <li><Link to="/login">Login</Link></li>
                </>
            }

        </>
    return (
        <div>
            <div className="navbar bg-red-400 font-medium text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-red-300 z-10 rounded-box w-52">
                            {navbar}
                        </ul>
                    </div>
                    <a className=" inline-flex w-12 h-12 text-4xl"><img className='rounded-full' src={logo1} alt="website_logo" />SpeakHour</a>
                </div>
                <div className="navbar-center navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navbar}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default NavBar;