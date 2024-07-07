import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

function CreateForm() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [allowedDomains, setAllowedDomains] = useState('');
    const [limitToOneResponse, setLimitToOneResponse] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/forms', {
                name,
                slug,
                description,
                allowed_domains: allowedDomains,
                limit_to_one_response: limitToOneResponse,
            });
            if (response.status === 201) {
                navigate('/home');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Failed to create form. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold">Create Form</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Slug:</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Allowed Domains:</label>
                    <input
                        type="text"
                        value={allowedDomains}
                        onChange={(e) => setAllowedDomains(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={limitToOneResponse}
                            onChange={(e) => setLimitToOneResponse(e.target.checked)}
                            className="mr-2"
                        />
                        Limit to 1 response
                    </label>
                </div>
                <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateForm;