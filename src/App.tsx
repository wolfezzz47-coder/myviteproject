import './App.css'
import HomePage from "./Pages/Home/HomePage.tsx";
import LoginPage from "./Pages/Login/LoginPage.tsx";
import {Route, Routes} from "react-router";
import NotFoundPage from "./Pages/NotFound/NotFoundPage.tsx";
import SLayout from "./components/SLayout/Slayout.tsx";
import RegisterPage from "./Pages/Register/RegisterPage.tsx";

function App() {

  console.log('Render App Component is running!')

  return (
    <>
        {/*<SNavbar/>*/}
        <Routes>
            <Route path="/" element={<SLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={"login"} element={<LoginPage/>} />
                <Route path={"register"} element={<RegisterPage/>} />
                <Route path={"*"} element={<NotFoundPage/>} />
            </Route>
        </Routes>
      {/*<h1 className={"text-3xl " +*/}
      {/*    "font-bold " +*/}
      {/*    "text-fuchsia-700 " +*/}
      {/*    "text-center"}>*/}
      {/*    Hello React Vite Workers*/}
      {/*</h1>*/}
    </>
  )
}

export default App
