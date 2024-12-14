import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserCircle, LogIn, ChevronDown } from 'lucide-react';
import logo1 from "../assets/logo1.png";
import avtar from '../assets/avtar.png';
import { Button } from './ui/button';
import { getUserFromSessionStorage } from '@/redux/authentication/action';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  
  const dropdownRef = useRef(null);  
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userReducer?.user)

  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);

  useEffect(() => {
    dispatch(getUserFromSessionStorage())
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); 
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur-md text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-0">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <Link to="/">
                <img src={logo1} alt="Logo" style={{ width: '165px', height: '75px' }} />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link to="/jobs" className="hover:underline">Jobs</Link>
              <Link to="/companies" className="hover:underline">Companies</Link>
              <Link to="/services" className="hover:underline">Services</Link>
              <Link to="/resources" className="hover:underline">Resources</Link>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <div onClick={() => setIsDropdownOpen(prevState => !prevState)} className="flex items-center cursor-pointer">
                    <img
                      src={avtar}  
                      alt="User"
                      className="h-8 w-8 rounded-full"
                    />
                    <ChevronDown className="ml-1 h-5 w-5" />
                  </div>
                  {isDropdownOpen && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40 flex flex-col p-4">
                      <Link to="/userProfile">User Profile</Link>
                      <Link onClick={handleLogout}>Logout</Link>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/SignIn">
                    <Button variant="ghost" className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white">
                      <UserCircle className="mr-2 h-5 w-5" />
                      Login
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/SignUp">
                    <Button variant="ghost" className="hidden md:flex bg-red-600 hover:bg-red-700 text-white">
                      <LogIn className="mr-2 h-5 w-5" />
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
