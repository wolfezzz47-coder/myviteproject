import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext.tsx";

const Navbar = () => {
    const { isAuthenticated, email, logout } = useAuth();

    // console.log-и можна прибрати, коли все запрацює
    console.log("isAuthenticated", isAuthenticated);
    console.log("email", email);
    console.log("logout", logout);

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                {/* Logo */}
                <NavLink to="/" className="text-xl font-bold text-gray-900">
                    MyApp
                </NavLink>

                {/* Navigation */}
                <div className="flex items-center gap-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `font-medium transition ${
                                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                            }`
                        }
                    >
                        Головна
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `font-medium transition ${
                                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                            }`
                        }
                    >
                        Про нас
                    </NavLink>

                    {isAuthenticated ? (
                        <>
                            {/* Замінили span на NavLink */}
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `font-medium transition ${
                                        isActive ? "text-blue-600" : "text-gray-900 hover:text-blue-600"
                                    }`
                                }
                            >
                                {email}
                            </NavLink>

                            <button
                                type="button"
                                onClick={logout}
                                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                            >
                                Вихід
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `font-medium transition ${
                                        isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                                    }`
                                }
                            >
                                Увійти
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                            >
                                Реєстрація
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;