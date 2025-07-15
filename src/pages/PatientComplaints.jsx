import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import Layout from '../layouts/Layout';



const PatientComplaints = ({user}) => {
  const [tab, setTab] = useState('form');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [feedback, setFeedback] = useState('');

  const token = localStorage.getItem('token');

  const fetchComplaints = async () => {
    try {
        const response = await apiService.get('/complaints');
        console.log(response);
        setComplaints(response?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback('');

    try {
        const response = await apiService.post('/complaints', { title, message },);
        console.log(response);
        setFeedback('Complaint submitted successfully.');
        setTitle('');
        setMessage('');
        fetchComplaints();
        setTab('list'); // switch to list after submit
    } catch {
        console.error(error);
        setFeedback('An error occurred. Try again.');
    }
  };

  useEffect(() => {
    if (tab === 'list') fetchComplaints();
  }, [tab]);

  return (
    <Layout>
        <div>
            <h2 className="text-2xl font-semibold">Welcome, {user?.username}</h2>
            <h4 className="text-2xl font-semibold">Share your concern with us</h4>
        </div>
        <div className="container mt-5">
        <ul className="nav nav-tabs">
            <li className="nav-item">
            <button
                className={`nav-link ${tab === 'form' ? 'active' : ''}`}
                onClick={() => setTab('form')}
            >
                File Complaint
            </button>
            </li>
            <li className="nav-item">
            <button
                className={`nav-link ${tab === 'list' ? 'active' : ''}`}
                onClick={() => setTab('list')}
            >
                My Complaints
            </button>
            </li>
        </ul>

        <div className="tab-content border rounded-bottom p-4">
            {tab === 'form' && (
            <form onSubmit={handleSubmit}>
                {feedback && (
                <div className="alert alert-info">{feedback}</div>
                )}
                <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    className="form-control"
                    placeholder="e.g. Wrong drug given"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Describe your complaint..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                Submit Complaint
                </button>
            </form>
            )}

            {tab === 'list' && (
            <div>
                {complaints.length === 0 ? (
                <p>No complaints submitted yet.</p>
                ) : (
                <div className="row">
                    {complaints.map((c) => (
                    <div key={c.id} className="col-md-6 col-lg-4 mb-3">
                        <div className='card shadow-sm p-4'>
                        <h5 className="mb-1">{c.title}</h5>
                        <p className="mb-1"><strong>Your message:</strong> {c.message}</p>
                        <p className="mb-1 text-muted">
                        <small>Submitted: {c.created_at}</small>
                        </p>
                        {c.response ? (
                        <div className="mt-2 p-3 bg-light border rounded">
                            <strong>Doctor's Response:</strong>
                            <p>{c.response}</p>
                        </div>
                        ) : (
                        <span className="badge bg-warning text-dark">Pending response</span>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            )}
        </div>
        </div>
    </Layout>
  );
};

export default PatientComplaints;
