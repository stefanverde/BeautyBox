import React, {useState} from "react";
import {isEmpty, validateEmail} from "../utils/functions";
import {Button, TextField} from "@mui/material";
import {CustomButton} from "./StyledComponents";
import HeaderLinks from "./HeaderLinks";
import Header from "./Header";
import {Together} from "./Register";
import PersonIcon from "@mui/icons-material/Person";
import {useNavigate} from "react-router-dom";
import {Colors} from "../utils/ColorPalette";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const login = async () => {
        if(email.trim() === ""){
            setEmailError("Campul nu poate fi gol");
            return;
        }
        if(password.trim() === ""){
            setPasswordError("Campul nu poate fi gol");
            return;
        }

        const response = await fetch("http://localhost:3001/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })

        const json = await response.json();
        if (response.ok && "access_token" in json) {
            localStorage.setItem("loginToken", json.access_token);
            navigate("/profile", {replace:true})
        }

    }

    return <div style={{backgroundColor: `${Colors.White}`, height: '100vh'}}>
        <Header/>
        <div style={{
            backgroundColor: `${Colors.White}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                height: '50%',
                backgroundColor: 'white',
                padding: ' 50px 50px 25px 50px',
                borderRadius: '10px',
                gap: '20px'
            }}>
                <TextField
                    className="customBorder"
                    type="email"
                    value={email}
                    label="Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value.trim())}
                    error={!!emailError}
                    helperText={emailError}
                    onBlur={() => {
                        if (!isEmpty(email, setEmailError)) {
                            setEmailError(
                                validateEmail(email) ? "" : "Email-ul nu este valid",
                            );
                        }
                    }}
                ></TextField>
                <TextField variant='outlined'
                           className="customBorder"
                           label='Parola' type='password'
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}
                           error={!!passwordError}
                           helperText={passwordError}
                           onBlur={() => {
                               if (!isEmpty(password, setPasswordError)) {
                                   setPasswordError(
                                       password.length >= 8
                                           ? ""
                                           : "Parola trebuie sa aiba cel putin 8 caractere",
                                   );
                               }
                           }}
                />
                <Button onClick={login} variant='text' sx={CustomButton}> Autentificare </Button>
                <Together style={{justifyContent:'space-between'}}>
                <HeaderLinks name="Nu ai cont? Inregistreaza-te" goto={"/register"} authLink/>
                    <HeaderLinks goto={"/adminLogin"} authLink> <PersonIcon /> </HeaderLinks>
                </Together>
                </div>
        </div>
        </div>
        }

        export default Login;