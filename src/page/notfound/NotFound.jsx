import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    const styleCode = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px'
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={styleCode}>
            <h1>Page does not exist, redirecting to home page...</h1>
        </div>
    );
}

export default NotFound;