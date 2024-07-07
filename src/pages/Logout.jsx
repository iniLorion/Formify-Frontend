import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Hapus token atau data sesi lainnya
        localStorage.removeItem('token');
        // Redirect ke halaman login
        navigate('/login');
    }, [navigate]);

    return <div>Logging out...</div>;
}

export default Logout;