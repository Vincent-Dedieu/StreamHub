import { Logo } from "./logo";
import Search from "./search";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[99] bg-slate-800 flex justify-between items-center px-2 ">
      <Logo />
      <Search />
    </nav>
  );
};

export default Navbar;
