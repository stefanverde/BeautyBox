import PersonIcon from "@mui/icons-material/Person";
import BodyArt from "../utils/BodyArt.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from "react";
import {Colors} from "../utils/ColorPalette";
import HeaderLinks from "./HeaderLinks";
import DropdownMenu from "./DropdownMenu";
export const SectionChoices = {
    display: "flex",
    fontWeight: 500,
    cursor: "pointer",
    color: `${Colors.DarkGreen}`,
    textDecoration: "unset",
    alignSelf: "center",
    padding: "25px",
    fontSize: "20px",
    transition: "transform 0.3s ease, color 0.3s ease"
};
export const smallLink = {
    display: "flex",
    fontWeight: 500,
    cursor: "pointer",
    color: `${Colors.DarkGreen}`,
    textDecoration: "unset",
    alignSelf: "center",
    padding: "10px",
    fontSize: "15px",
    transition: "transform 0.3s ease, color 0.3s ease"
}

function Header() {

    const categories = {
        "Per Sedinta": ["Makeup", "Laminare", "Tratamente Faciale"],
        "Abonament": ["Laminare", "Tratamente Faciale"]
    };
    return (
        <nav
            style={{
                background: `${Colors.MintGreen}`,
                height: "100px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <img src = {BodyArt} alt="Logo" style = {{width:'100px', marginTop:'20px', marginLeft:'50px'}} />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "20px",
                    color: `${Colors.MintGreen}`,
                }}
            >
                <HeaderLinks name = "Home" goto = {"/"}/>
                {/*<HeaderLinks name = "Services" goto = {"/services"}/>*/}
                <DropdownMenu categories={categories}/>
                <HeaderLinks name = "Contact" goto = {"/contact"}/>

            </div>
            <div style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "20px",
                    color: `${Colors.MintGreen}`,
                }}>
                {localStorage.getItem("authToken") ||
                localStorage.getItem("adminToken") ? (
                    <HeaderLinks name = "Contul Meu" goto={localStorage.getItem("adminToken") ? "/panel" : "/dashboard"}>
                        <PersonIcon />
                    </HeaderLinks>
                ) : (
                    <HeaderLinks goto={"/login"}><PersonIcon /></HeaderLinks>)}

                <HeaderLinks goto={"/shoppingCart"}><ShoppingCartIcon /></HeaderLinks>
            </div>
        </nav>
    );
}

export default Header;
