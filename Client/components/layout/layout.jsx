import { Outlet } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";

export default function Layout() {
    return (
        <div className="layout">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}