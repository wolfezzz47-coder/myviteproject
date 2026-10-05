import {createContext, type FC, type PropsWithChildren, useContext, useState} from "react";
import {jwtDecode} from "jwt-decode";
import type {ITokenInfo} from "../Pages/Login/types.ts";

// Стан авторизації: мінімум даних, які нам потрібні в застосунку
interface IAuthState {
    email: string | null;   // null = користувач не авторизований
}

// Публічний "контракт" контексту — те, що бачать компоненти через useAuth()
interface IAuthContextValue extends IAuthState {
    isAuthenticated: boolean;              // зручний прапорець для UI
    login: (token: string) => void;        // приймає JWT і зберігає його
    logout: () => void;                    // очищує токен
}

// Ключ, під яким JWT лежить у localStorage
export const AUTH_STORAGE_KEY = "auth";

/**
 * Лінива ініціалізація стану.
 * Викликається React'ом ОДИН раз при монтуванні AuthProvider.
 * Читає токен із localStorage, декодує JWT і витягує email.
 * Якщо токена немає або він побитий — повертає "гостя".
 */
const getInitialState = (): IAuthState => {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!token) return {email: null};
    try {
        // jwtDecode НЕ перевіряє підпис! Просто розпаковує payload.
        const decode = jwtDecode<ITokenInfo>(token);
        return {email: decode.email};
    } catch {
        // Пошкоджений токен — краще прикинутись, що його немає
        return {email: null};
    }
};

// null як дефолт — щоб useAuth міг відрізнити "поза провайдером"
const AuthContext = createContext<IAuthContextValue | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    // Передаємо функцію (а не результат!) — React викличе її лише раз
    const [auth, setAuth] = useState<IAuthState>(getInitialState);

    /**
     * login: декодує JWT → дістає email → кладе токен у localStorage → оновлює state.
     * Після цього всі споживачі useAuth() ре-рендеряться.
     */
    const login = (token: string) => {
        const decode = jwtDecode<ITokenInfo>(token);
        const newState = {token, email: decode.email};   // ⚠️ тут є баг, див. нижче
        localStorage.setItem(AUTH_STORAGE_KEY, token);
        setAuth(newState);
    };

    /**
     * logout: чистить localStorage і скидає state.
     */
    const logout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setAuth({email: null});
    };

    return (
        // value — об'єкт, який "роздається" всім нащадкам.
        // Зверни увагу: об'єкт створюється заново на КОЖЕН рендер батька.
        <AuthContext.Provider
            value={{
                ...auth,                                  // email
                isAuthenticated: !!auth.email,            // email є → true
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Хук-обгортка над useContext.
 * Кидає помилку, якщо хтось забув обгорнути дерево в <AuthProvider>.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};