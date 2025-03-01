import Header from "../components/Header";
import {Button, TextField} from "@mui/material";
import {isEmpty} from "../utils/functions";
import {CustomButton} from "../components/StyledComponents";
import React, {useState} from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useNavigate} from "react-router-dom";
import {Colors} from "../utils/ColorPalette";

const AdminLogin = () => {
    const [id, setId] = useState('');
    const [idError, setIdError] = useState('');

    const navigate = useNavigate();

    const login = async () => {
    const response = await fetch("http://localhost:3001/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
        })
    })

    const json = await response.json();
    console.log("json",json);
    if (response.ok && "admin_token" in json) {
        localStorage.setItem("adminToken", json.access_token);
        navigate("/dashboard",{replace:true})
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
                value={id}
                label="Admin"
                variant="outlined"
                onChange={(e) => setId(e.target.value.trim())}
                error={!!idError}
                helperText={idError}
                onBlur={() => isEmpty(id, setIdError)}
            ></TextField>

            <Button onClick={login} variant='text' sx={CustomButton}> <ArrowForwardIcon/> </Button>

        </div>
    </div>
</div>
}

export default AdminLogin;