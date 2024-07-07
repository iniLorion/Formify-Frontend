import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';

function SubmitForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Ambil detail form dari API
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(`/forms/${id}`);
        const data = response.data;
        setForm(data.form);
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchFormDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lakukan permintaan untuk submit form
    try {
      const response = await axios.post(`/forms/${id}/responses`, { answers });
      if (response.status === 200) {
        alert('Form submitted successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    }
  };

  const handleChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{form.name}</h2>
      <p>{form.description}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <label>{question.text}</label>
            <input
              type="text"
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitForm;