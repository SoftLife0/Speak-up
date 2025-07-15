import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { toast } from 'react-toastify';
import Layout from '../layouts/Layout';

const DoctorComplaints = ({user}) => {
  const [complaints, setComplaints] = useState([]);
  const [responseInputs, setResponseInputs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
        const response = await apiService.get('/complaints');
        console.log(response.data)
        setComplaints(response?.data);
    } catch (err) {
      console.error('Error fetching complaints', err);
    }
  };

  const handleResponseChange = (id, value) => {
    setResponseInputs((prev) => ({ ...prev, [id]: value }));
  };

  const submitResponse = async (id) => {
    const responseText = responseInputs[id];
    if (!responseText) return;

    try {
      await apiService.post(`/complaints/${id}/respond`, { response: responseText });
      toast.success('Response submitted successfully');
      fetchComplaints();
    } catch (err) {
      console.error('Error submitting response', err);
    }
  };

  return (
    <Layout>
        <div>
            <h2 className="text-2xl font-semibold">Welcome, {user?.username}</h2>
            <h4 className="text-2xl font-semibold">See what your patients are saying</h4>
        </div>
        <div className="container mt-5">
        <h3 className="mb-4">Patient Complaints</h3>

        {complaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
        ) : (
            complaints.map((complaint) => (
            <div key={complaint.id} className="card mb-4 shadow-sm">
                <div className="card-body">
                <h5 className="card-title">{complaint.title}</h5>
                <p className="card-text"><strong>Message:</strong> {complaint.message}</p>
                <p className="text-muted">
                    <small>Submitted: {complaint.created_at}</small>
                </p>

                {complaint.response ? (
                    <div className="mt-3 p-3 bg-light border rounded">
                    <strong>Response:</strong>
                    <p>{complaint.response}</p>
                    </div>
                ) : (
                    <div className="mt-3">
                    <textarea
                        className="form-control mb-2"
                        rows={3}
                        placeholder="Write your response here..."
                        value={responseInputs[complaint.id] || ''}
                        onChange={(e) => handleResponseChange(complaint.id, e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => submitResponse(complaint.id)}
                    >
                        Submit Response
                    </button>
                    </div>
                )}
                </div>
            </div>
            ))
        )}
        </div>
    </Layout>
  );
};

export default DoctorComplaints;
