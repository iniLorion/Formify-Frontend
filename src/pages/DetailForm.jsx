import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';

function DetailForm() {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchFormDetails = async () => {
            try {
                const response = await axios.get(`/forms/${id}`);
                const data = response.data;
                setForm(data.form);
                setQuestions(data.questions);
                setResponses(data.responses);
            } catch (error) {
                console.error('Error fetching form details:', error);
            }
        };

        fetchFormDetails();
    }, [id]);

    if (!form) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold">{form.name}</h2>
            <p>{form.description}</p>
            <p>Form Link: <a href={`API_ENDPOINT/forms/${form.slug}`} className="text-blue-500 hover:underline">{`API_ENDPOINT/forms/${form.slug}`}</a></p>
            <h3 className="mt-4 text-xl font-semibold">Questions</h3>
            <ul className="space-y-2">
                {questions.map((question) => (
                    <li key={question.id} className="p-2 bg-white rounded shadow">{question.text}</li>
                ))}
            </ul>
            <Link to={`/submit-form/${form.id}`} className="inline-block px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Submit Response
            </Link>
            <h3 className="mt-4 text-xl font-semibold">Responses</h3>
            <ul className="space-y-2">
                {responses.map((response) => (
                    <li key={response.id} className="p-2 bg-white rounded shadow">{response.answer}</li>
                ))}
            </ul>
        </div>
    );
}

export default DetailForm;