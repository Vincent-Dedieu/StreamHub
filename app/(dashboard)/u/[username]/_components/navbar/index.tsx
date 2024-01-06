import Actions from "./actions";
import { Logo } from "./logo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-40 bg-slate-800 flex justify-between items-center px-2 ">
      <Logo />
      <Actions />
    </nav>
  );
};

export default Navbar;
