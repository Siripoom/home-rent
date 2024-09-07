import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <div className="navbar bg-[#1A2145] text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#1A2145] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="acc">Accommodation</Link>
            </li>
            <li>
              <Link to="contact">Contact</Link>
            </li>
            <li>
              <Link to="content">Content</Link>
            </li>
            <li>
              <Link to="about">About</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-white">
          Pool villa Aonang home
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="acc">Accommodation</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
          <li>
            <Link to="content">Content</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">{/* <a className="btn">Button</a> */}</div>
    </div>
  );
}
