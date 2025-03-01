import {Link} from "react-router-dom";
import React from "react";
import {SectionChoices, smallLink} from "./Header";

interface HeaderLinksProps {
    name?: string;
    goto:string;
    children?: React.ReactNode;
    authLink?:boolean;
}
const HeaderLinks = ({name = "", goto, children,authLink}:HeaderLinksProps) => {
    return <Link to={goto} style={authLink?smallLink:SectionChoices}
                 onMouseEnter={(e) =>
                     (e.currentTarget.style.transform = "scale(1.2)")}
                 onMouseLeave={(e) =>
                     (e.currentTarget.style.transform = "scale(1)")}>
        {name || children}
    </Link>
}

export default HeaderLinks;