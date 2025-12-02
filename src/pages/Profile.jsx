import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    college: '',
    department: '',
    password: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get('/users/profile');
      setProfile(data);
      setFormData({
        name: data.name || '',
        phone: data.phone || '',
        college: data.college || '',
        department: data.department || '',
        password: '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      
      await API.put('/users/profile', updateData);
      alert('Profile updated successfully! ✅');
      setEditing(false);
      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="profile-header-info">
              <h1 className="profile-name">{profile?.name}</h1>
              <p className="profile-email">{profile?.email}</p>
              <span className={`role-badge role-${profile?.role}`}>
                {profile?.role}
              </span>
            </div>
          </div>

          {editing ? (
            <form onSubmit={handleUpdate} className="profile-form">
              <div className="form-section">
                <h2 className="form-section-title">Edit Profile</h2>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">College/University</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Department/Branch</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Password (leave empty to keep current)</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="form-input"
                    placeholder="••••••••"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setEditing(false)} className="btn-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-section">
                <h2 className="info-section-title">Personal Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{profile?.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{profile?.phone || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">College</span>
                    <span className="info-value">{profile?.college || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Department</span>
                    <span className="info-value">{profile?.department || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Member Since</span>
                    <span className="info-value">
                      {new Date(profile?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button onClick={() => setEditing(true)} className="btn-edit-profile">
                  Edit Profile
                </button>
                <button onClick={logout} className="btn-logout-profile">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;