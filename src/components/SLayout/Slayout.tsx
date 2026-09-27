import {Outlet} from "react-router";
import SNavbar from "../SNavbar/SNavbar.tsx";

const SLayout = () =>
{
    return (
        <>
            <SNavbar />
            <Outlet />
        </>
    )
}

export default SLayout;