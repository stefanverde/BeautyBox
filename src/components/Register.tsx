import React, {useState} from "react";
import {Alert, Button, TextField} from "@mui/material";
import {isEmpty, validateEmail} from "../utils/functions";
import "../utils/styles.css";
import {CustomButton} from "./StyledComponents";
import "./AlertTransition.css";
import {CSSTransition} from "react-transition-group";
import Header from "./Header";
import styled from "styled-components";
import HeaderLinks from "./HeaderLinks";
import {Colors} from "../utils/ColorPalette";

export const Together = styled.div`
    display:flex;
    flex-direction: row;
    gap: 10px;
`;
const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");


    const [emailError, setEmailError] = useState("");
    const [telephoneError, setTelephoneError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const [errorText, setErrorText] = useState("");
    const [accountExists, setAccountExists] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const register = async () => {
        let isValid = true;

        if (isEmpty(firstName, setFirstNameError)) {
            isValid = false;
        }
        if (isEmpty(lastName, setLastNameError)) {
            isValid = false;
        }
        if (isEmpty(tel, setTelephoneError)) {
            isValid = false;
        }
        if (isEmpty(email, setEmailError)) {
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Email-ul nu este valid");
            isValid = false;
        }

        if (isEmpty(password, setPasswordError)) {
            isValid = false;
        } else if (!(password.length >= 8)) {
            setPasswordError("Parola trebuie sa aiba cel putin 8 caractere");
            isValid = false;
        }

        if (isEmpty(repeatPassword, setRepeatPasswordError)) {
            isValid = false;
        } else if (password !== repeatPassword) {
            setRepeatPasswordError("Parolele nu coincid");
            isValid = false;
        }

        if (!isValid) {
            return;
        }


        let checkExistingEmail = await fetch(`http://localhost:3001/user/byEmail/${email}`, {
            method: "GET",
        });
        const string = await checkExistingEmail.text();
        const user = string ? JSON.parse(string) : null;
        console.log(user, 'user');
        if (user) {
            setErrorText("Un cont adresa de email exista deja.");
            setAccountExists(true);
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: tel,
                    password: password,
                    repeatPassword: repeatPassword,
                }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 2000);
            return await response.json();
        } catch (error) {
            console.error("Registration error:", error);
        }
    }


    return <div style={{backgroundColor: `${Colors.White}`, height: '100vh'}}>
        <Header/>
        {/*<div style={{display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column', marginTop: '10px'}}>*/}
        {/*    <div style={{*/}
        {/*        padding: '10px',*/}
        {/*        gap: '10px',*/}
        {/*        width: '50%',*/}
        {/*        height: '400px',*/}
        {/*        display: 'flex',*/}
        {/*        flexDirection: 'column',*/}
        {/*        justifyContent: 'space-evenly'*/}
        {/*    }}>*/}
        <div style={{
            backgroundColor: `${Colors.White}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2%'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '50%',
                backgroundColor: 'white',
                padding: '40px 40px 20px 40px',
                borderRadius: '10px',
                gap: '15px'
            }}>
                <Together>
                <TextField variant='outlined' className="customBorder"
                           label='Prenume'
                           onChange={(e) => setFirstName(e.target.value)}
                           value={firstName}
                           error={!!firstNameError}
                           helperText={firstNameError}
                           onBlur={() => isEmpty(firstName, setFirstNameError)}
                />
                <TextField variant='outlined'
                           className="customBorder"
                           label='Nume de familie'
                           onChange={(e) => setLastName(e.target.value)}
                           value={lastName}
                           error={!!lastNameError}
                           helperText={lastNameError}
                           onBlur={() => isEmpty(lastName, setLastNameError)}
                />
                </Together>

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
                <TextField variant='outlined' className="customBorder"
                           label='Telefon' type='tel'
                           onChange={(e) => setTel(e.target.value)}
                           value={tel}
                           error={!!telephoneError}
                           helperText={telephoneError}
                           onBlur={() => isEmpty(tel, setTelephoneError)}
                />
                <Together>

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
                <TextField variant='outlined' className="customBorder"
                           label='Repeta Parola' type='password'
                           onChange={(e) => setRepeatPassword(e.target.value)}
                           value={repeatPassword}
                           helperText={repeatPasswordError}
                           error={!!repeatPasswordError}
                           onBlur={() => {
                               if (!isEmpty(repeatPassword, setRepeatPasswordError)) {
                                   setRepeatPasswordError(
                                       password === repeatPassword ? "" : "Parolele nu coincid",
                                   );
                               }
                           }}
                />
                </Together>
                {accountExists && <div style={{color: "red"}}> {errorText}</div>}
                <Button onClick={register} variant='text' sx={CustomButton}> Creeaza Cont !</Button>
                <HeaderLinks name="Inapoi la Autentificare" goto={"/login"} authLink/>
            </div>
            <CSSTransition
                in={showSuccessAlert}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <Alert severity="success" style={{marginTop: '50px'}}> Contul a fost Creat cu Succes.</Alert>
            </CSSTransition>
        </div>
    </div>
}

export default Register;