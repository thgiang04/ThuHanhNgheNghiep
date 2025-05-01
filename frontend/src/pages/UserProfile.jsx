import React, { useState } from 'react';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import './UserProfile.css';

const UserProfile = () => {
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="main-wrapper">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar-info">
              <img
                src={selectedImage || "src/assets/user.png"}
                alt="avatar"
                className="profile-avatar"
              />
              <div className="profile-basic-info">
                <h2>Nguyễn Văn A</h2>
                <p>nguyenvana@example.com</p>
                <p>Đại học Công nghệ</p>
              </div>
            </div>
          </div>

          <div className="profile-body">
            <div className="profile-field">
              <div className="field-label">Họ tên</div>
              <div className="field-value">Nguyễn Văn A</div>
            </div>
            <div className="profile-field">
              <div className="field-label">Email</div>
              <div className="field-value">nguyenvana@example.com</div>
            </div>
            <div className="profile-field">
              <div className="field-label">Trường</div>
              <div className="field-value">Đại học Công nghệ</div>
            </div>

            <div className="profile-actions">
              <button className="profile-button" onClick={() => setShowEditInfo(true)}>
                Chỉnh sửa thông tin
              </button>
              <button className="profile-button" onClick={() => document.getElementById('avatarInput').click()}>
                Đổi ảnh đại diện
              </button>
              <button className="profile-button" onClick={() => setShowChangePassword(true)}>
                Đổi mật khẩu
              </button>
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {showEditInfo && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popup-title">Chỉnh sửa thông tin</h3>
            <div className="popup-form">
              <input className="popup" type="text" placeholder="Họ tên" />
              <input className="popup" type="email" placeholder="Email" />
              <input className="popup" type="text" placeholder="Trường" />
            </div>
            <div className="popup-buttons">
              <button className="popup-button">Cập nhật</button>
              <button className="popup-button cancel" onClick={() => setShowEditInfo(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}


      {showChangePassword && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popup-title">Đổi mật khẩu</h3>
            <div className="popup-form">
              <input className="popup" type="password" placeholder="Mật khẩu cũ" />
              <input className="popup" type="password" placeholder="Mật khẩu mới" />
              <input className="popup" type="password" placeholder="Nhập lại mật khẩu mới" />
            </div>
            <div className="popup-buttons">
              <button className="popup-button">Cập nhật</button>
              <button className="popup-button cancel" onClick={() => setShowChangePassword(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}


      <Footer />
    </>
  );
};

export default UserProfile;
