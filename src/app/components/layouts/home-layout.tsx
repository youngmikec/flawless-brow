import { FC } from "react";
import Footer from "../app/Footer";
import Navbar from "../app/Navbar";


const HomeLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative w-full overflow-hidden">
            <Navbar />
            <div>{ children }</div>
            <Footer />
        </div>
    )
}
export default HomeLayout;