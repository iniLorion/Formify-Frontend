import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';

function Home() {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        // Ambil daftar form dari API
        const fetchForms = async () => {
            try {
                const response = await axios.get('/forms');
                setForms(response.data);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };

        fetchForms();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold">My Forms</h2>
            <ul className="space-y-2">
                {forms.map((form) => (
                    <li key={form.id} className="p-4 bg-white rounded shadow">
                        <Link to={`/form/${form.id}`} className="text-blue-500 hover:underline">{form.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/create-form" className="inline-block px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Create New Form
            </Link>
        </div>
    );
}

export default Home;