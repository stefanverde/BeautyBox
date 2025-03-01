import Header from "../components/Header";
import { Colors} from "../utils/ColorPalette";
import styled from "styled-components";
import {useState, useEffect} from "react";
const Box = styled.div<{ visible?: boolean; }>`
    background-color: white;
    width:20%;
    height:40%;
    box-shadow: 2px 8px 20px rgba(0, 0, 0, 0.25); 
    border-radius: 10px; 
    padding: 20px; 
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transform: ${(props) => (props.visible ? "scale(1)" : "scale(0.9)")};
    transition: all 0.5s ease-in-out;
`;
const Contact = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger the visibility state change on page load
        setTimeout(() => setVisible(true), 100); // Add a slight delay for a smoother effect
    }, []);
    return <div style = {{backgroundColor:`${Colors.White}`, height:'100vh'}}>
        <Header/>
        <h2 style = {{color:`${Colors.DarkGreen}`}}>Ne poti gasi aici !</h2>
        <div style={{display:'flex', height:'50%', alignItems:'center', justifyContent:'space-around'}}>
            <Box visible={visible}>
                <h3 style = {{color:`${Colors.DarkGreen}`, borderBottom:'1px solid black'}}>Telefon</h3>
                <div>0774481012</div>
            </Box>
            <Box visible={visible}>
                <h3 style = {{color:`${Colors.DarkGreen}`, borderBottom:'1px solid black'}}>Email</h3>
                <div>bodyart_tech@yahoo.com </div>
            </Box>
            <Box visible={visible}>
                <h3 style = {{color:`${Colors.DarkGreen}`, borderBottom:'1px solid black'}}>Adresa</h3>
                <div>Strada Alexandru Vaida Voevod 14A, Cluj-Napoca</div>
            </Box>
        </div>

    </div>
}

export default Contact;