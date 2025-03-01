// DropdownMenu.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {Colors} from "../utils/ColorPalette";

// Define the prop types
type DropdownMenuProps = {
    categories: { [key: string]: string[] }; // categories object with string keys and array of strings as values
};

const DropdownMenu = ({ categories }: DropdownMenuProps) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [subMenu, setSubMenu] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (category: string) => {
        setOpenMenu(category);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setOpenMenu(null);
        setSubMenu(null);
        setIsHovered(false);
    };

    const handleSubMenuEnter = (category: string) => {
        setSubMenu(category);
    };

    const handleSubMenuLeave = () => {
        setSubMenu(null);
    };

    return (
        <nav>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    gap: "20px",
                    cursor: "pointer",
                    zIndex:100
                }}
            >
                {/* Services Dropdown */}
                <li
                    onMouseEnter={() => handleMouseEnter("Services")}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transform: isHovered ? "scale(1.2)" : "scale(1)",
                        transition: "transform 0.3s ease",
                        position: "relative", color:`${Colors.DarkGreen}`,
                        zIndex:100,
                        fontWeight: 500,
                    }}

                >
                    Services
                    {/* Submenu for Per Sedinta and Abonament */}
                    {openMenu === "Services" && (
                        <ul
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                background: "white",
                                border: "1px solid #ccc",
                                padding: "15px",
                                listStyle: "none",
                                margin: 0,
                                width: "200px",
                            }}
                        >
                            {/* Per Sedinta */}
                            <li
                                onMouseEnter={() => handleSubMenuEnter("per sedinta")}
                                onMouseLeave={handleSubMenuLeave}
                                style={{ padding: "5px",zIndex:100 }}
                            >
                                Per Sedinta
                                {/* Subcategories for Per Sedinta */}
                                {subMenu === "per sedinta" && (
                                    <ul style={{ marginTop:'10px',padding: "10px", listStyle:'none' }}>
                                        {categories["Per Sedinta"].map((category) => (
                                            <li key={category} style={{ marginBottom: "5px" }}>
                                                <Link
                                                    to={`/services/per sedinta/${category}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "black",
                                                    }}
                                                >
                                                    {category}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>

                            {/* Abonament */}
                            <li
                                onMouseEnter={() => handleSubMenuEnter("abonament")}
                                onMouseLeave={handleSubMenuLeave}
                                style={{ padding: "5px" }}
                            >
                                Abonament
                                {/* Subcategories for Abonament */}
                                {subMenu === "abonament" && (
                                    <ul style={{ marginTop:'10px',padding: "10px", listStyle:'none' }}>
                                        {categories["Abonament"].map((category) => (
                                            <li key={category} style={{ marginBottom: "15px" }}>
                                                <Link
                                                    to={`/services/abonament/${category}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "black",
                                                        zIndex:100
                                                    }}
                                                >
                                                    {category}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default DropdownMenu;
