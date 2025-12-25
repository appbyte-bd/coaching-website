import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navRef = useRef();

  // Navigation links array
  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/courses", name: "Courses" },
    { path: "/admission", name: "Admission" },
    { path: "/result", name: "Result" },
    { path: "/contact", name: "Contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowNavbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };



  const navLinkClass = ({ isActive }) =>
    `text-base font-normal text-black no-underline transition-all ${isActive
      ? "text-[#24243e] font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-[#24243e]"
      : ""
    }`;

  const buttonClass =
    "inline-flex items-center justify-center appearance-none bg-gradient-to-r from-[#000046] via-[#1CB5E0] to-[#000046] bg-[length:200%_auto] border-0 rounded-md text-white cursor-pointer font-['JetBrains_Mono',monospace] leading-none overflow-hidden px-4 py-2 relative text-left no-underline transition-all duration-500 select-none touch-manipulation whitespace-nowrap text-lg hover:bg-[position:right_center] hover:shadow-[0_4px_8px_rgba(45,35,66,0.4),0_7px_13px_-3px_rgba(45,35,66,0.3),0_-3px_0_inset_#000046] active:translate-y-[2px]";

  return (
    <nav
      ref={navRef}
      className="h-[60px] bg-white/50 relative shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] z-[1200] w-full top-0 left-0"
    >
      <div className="maxw pxc flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-full overflow-y-hidden">
          <NavLink to="/" onClick={() => setShowNavbar(false)}>
            <img src={"/logo.jpg"} alt="Logo" className="h-[45px]" />
          </NavLink>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="hidden max-[700px]:flex cursor-pointer w-[35px] p-[3px] border-2 border-black items-center justify-center"
          onClick={handleShowNavbar}
        >
          {showNavbar ? (
            <X className="text-black" size={24} />
          ) : (
            <Menu className="text-black" size={24} />
          )}
        </div>

        {/* Navigation Elements */}
        <div
          className={`box-border max-[700px]:absolute max-[700px]:right-0 max-[700px]:top-[60px] max-[700px]:bg-white max-[700px]:shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] max-[700px]:h-[calc(100vh-60px)] max-[700px]:transition-all max-[700px]:duration-300 max-[700px]:ease-in max-[700px]:overflow-hidden ${showNavbar ? "max-[700px]:w-[200px]" : "max-[700px]:w-0"
            }`}
        >
          <ul className="px-[10px] flex justify-between items-center list-none gap-[25px] max-[700px]:flex-col max-[700px]:items-start">
            {/* Map through navigation links */}
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={navLinkClass}
                  onClick={() => setShowNavbar(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}




          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;