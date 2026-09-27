import {NavLink} from "react-router";

const Navbar = () => {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"> {/* Logo */}
                <NavLink to="/"
                         className="text-xl font-bold text-gray-900">
                    MyApp
                </NavLink> {/* Navigation */}
                <div className="flex items-center gap-6">
                    <NavLink to="/"
                             className={({isActive}) =>
                                 `font-medium transition ${isActive ? 
                                     "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                        Головна
                    </NavLink>
                    <NavLink to="/about"
                             className={({isActive}) =>
                                 `font-medium transition ${isActive ? 
                                     "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                        Про нас
                    </NavLink>
                    <NavLink to="/login"
                             className={({isActive}) =>
                                 `font-medium transition ${isActive ? 
                                     "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                        Увійти
                    </NavLink>
                    <NavLink to="/register"
                             className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700">
                        Реєстрація
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
