import React, { useState } from 'react';
import NavbarGV from './NavbarGV';
import FooterGV from './FooterGV';
import './UserProfileGV.css';
import defaultAvatar from '../assets/userGV.png'; 

const UserProfileGV = () => {
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
      <NavbarGV />
      <div className="main-wrapperGV">
        <div className="profile-containerGV">
          <div className="profile-headerGV">
            <div className="profile-avatar-infoGV">
              <img
                src={selectedImage || defaultAvatar}
                alt="avatar"
                className="profile-avatarGV"
              />
              <div className="profile-basic-infoGV">
                <h2>Nguyễn Văn B</h2>
                <p>nguyenvanb@example.com</p>
                <p>Đại học Sư phạm TPHCM</p>
              </div>
            </div>
          </div>

          <div className="profile-bodyGV">
            <div className="profile-fieldGV">
              <div className="field-labelGV">Họ tên</div>
              <div className="field-valueGV">Nguyễn Văn B</div>
            </div>
            <div className="profile-fieldGV">
              <div className="field-labelGV">Email</div>
              <div className="field-valueGV">nguyenvanb@example.com</div>
            </div>
            <div className="profile-fieldGV">
              <div className="field-labelGV">Trường</div>
              <div className="field-valueGV">Đại học Sư phạm TPHCM</div>
            </div>

            <div className="profile-actionsGV">
              <button className="profile-buttonGV" onClick={() => setShowEditInfo(true)}>
                Chỉnh sửa thông tin
              </button>
              <button className="profile-buttonGV" onClick={() => document.getElementById('avatarInput').click()}>
                Đổi ảnh đại diện
              </button>
              <button className="profile-buttonGV" onClick={() => setShowChangePassword(true)}>
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
        <div className="popup-overlayGV">
          <div className="popup-contentGV">
            <h3 className="popup-titleGV">Chỉnh sửa thông tin</h3>
            <div className="popup-formGV">
              <input className="popupGV" type="text" placeholder="Họ tên" />
              <input className="popupGV" type="email" placeholder="Email" />
              <input className="popupGV" type="text" placeholder="Trường" />
            </div>
            <div className="popup-buttonsGV">
              <button className="popup-buttonGV">Cập nhật</button>
              <button className="popup-buttonGV cancel" onClick={() => setShowEditInfo(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {showChangePassword && (
        <div className="popup-overlayGV">
          <div className="popup-contentGV">
            <h3 className="popup-titleGV">Đổi mật khẩu</h3>
            <div className="popup-formGV">
              <input className="popupGV" type="password" placeholder="Mật khẩu cũ" />
              <input className="popupGV" type="password" placeholder="Mật khẩu mới" />
              <input className="popupGV" type="password" placeholder="Nhập lại mật khẩu mới" />
            </div>
            <div className="popup-buttonsGV">
              <button className="popup-buttonGV">Cập nhật</button>
              <button className="popup-buttonGV cancel" onClick={() => setShowChangePassword(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      <FooterGV />
    </>
  );
};

export default UserProfileGV;