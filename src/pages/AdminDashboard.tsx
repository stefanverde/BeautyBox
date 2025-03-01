import {useNavigate} from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("adminToken");
        navigate("/", {replace:true})
    }
    return <div>hellosss admin
    <button onClick={logout}>logout</button>
    </div>
}

export default AdminDashboard;