import { useNavigate } from "react-router-dom";

function useLogout(setEmail) {
    const navigate = useNavigate();
    
    const logout = () => {
        console.log("logout called", {setEmail});
        if (setEmail) setEmail(null);
        navigate('/main');
    }

    return { logout }; 
}

export default useLogout;