
import Wrapper from "../assets/wrappers/BigSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useAppContext } from "../context/appContext";
import { NavLinks } from "./index";


const BigSidebar = () => {
    const { showSidebar, toggleSidebar } = useAppContext()
    return <Wrapper>
        <div className={ showSidebar ? "sidebar-container show-sidebar" : "sidebar-container" }>
            <div className="content">
                <header>
                    <Logo />
                </header>
                <NavLinks/>
            </div>
        </div>
    </Wrapper>
}

export default BigSidebar;