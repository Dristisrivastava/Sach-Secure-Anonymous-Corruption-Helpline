import React, { useState } from 'react';
import axios from 'axios';

export default function ReportForm() {
  const [formData, setFormData] = useState({ description: '', region: '', department: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/incidents', formData);
    const trackingId = res.data.trackingId;

    alert(`✅ Incident submitted anonymously!\n🆔 Your Tracking ID is: ${trackingId}\nPlease save this to check your report status.`);

    setFormData({ description: '', region: '', department: '' });
  } catch (error) {
    alert('❌ Submission failed. Please try again.');
  }
};


  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Submit Anonymous Report</h2>
      <textarea name="description" placeholder="Describe the incident" value={formData.description} onChange={handleChange} required />
      <input name="region" placeholder="Region (e.g., East, West)" value={formData.region} onChange={handleChange} required />
      <input name="department" placeholder="Department (e.g., Police)" value={formData.department} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}
