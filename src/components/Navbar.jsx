import { Link, NavLink } from "react-router";

export function Navbar() {
  return (
    <>
      <div className="container mx-auto  mt-8">
        <nav className="text-lg font-semibold flex items-center gap-20 text-white borded">
          <ul className="flex m-auto bg-white/5 rounded-full shadow-lg border border-white/10">
            <NavLink
              to={""}
              className={({ isActive }) =>
                isActive ? "bg-[var(--primary)] rounded-l-full" : ""
              }
            >
              <li className="hover:bg-[var(--primary)] rounded-l-full transition-all duration-300 cursor-pointer text-center w-32 sm:w-40 py-3 border-r border-white/10">
                All
              </li>
            </NavLink>
            <NavLink
              to={"/activetodos"}
              className={({ isActive }) =>
                isActive ? "bg-[var(--primary)] " : ""
              }
            >
              <li className="hover:bg-[var(--primary)] transition-all duration-300 cursor-pointer text-center w-32 sm:w-40 py-3  border-r border-white/10">
                Active
              </li>
            </NavLink>
            <NavLink
              to={"completedtodos"}
              className={({ isActive }) =>
                isActive ? "bg-[var(--primary)] rounded-r-full" : ""
              }
            >
              <li className="hover:bg-[var(--primary)] transition-all duration-300 cursor-pointer text-center w-32 sm:w-40 py-3 rounded-r-full">
                Completed
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </>
  );
}
