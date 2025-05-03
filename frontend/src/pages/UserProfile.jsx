import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import "./UserProfile.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    school: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/user/upload-avatar/${user.email}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newImage = res.data.image || res.data.avatarUrl;
      const updatedUser = { ...user, image: newImage };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Cập nhật ảnh đại diện thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tải ảnh đại diện", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const finalUpdate = {
      name: editUser.name.trim() || user.name,
      email: editUser.email.trim() || user.email,
      school: editUser.school.trim() || user.school,
    };

    try {
      await axios.put(
        `http://localhost:3000/api/user/${user.email}`,
        finalUpdate
      );

      const updatedUser = { ...user, ...finalUpdate };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setShowEditInfo(false);
      toast.success("Cập nhật thông tin thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại. Vui lòng thử lại.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới không khớp.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/user/change-password`, {
        email: user.email,
        oldPassword,
        newPassword,
      });

      toast.success("Đổi mật khẩu thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
      setShowChangePassword(false);
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Đổi mật khẩu thất bại.", {
        position: "top-center",
        autoClose: 2000,
      });
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
                src={user?.image || "src/assets/user.png"}
                alt="avatar"
                className="profile-avatar"
              />

              <div className="profile-basic-info">
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
                <p>{user?.school || "Chưa có thông tin"}</p>
              </div>
            </div>
          </div>

          <div className="profile-body">
            <div className="profile-field">
              <div className="field-label">Họ tên</div>
              <div className="field-value">{user?.name}</div>
            </div>
            <div className="profile-field">
              <div className="field-label">Email</div>
              <div className="field-value">{user?.email}</div>
            </div>
            <div className="profile-field">
              <div className="field-label">Trường</div>
              <div className="field-value">
                {user?.school || "Chưa có thông tin"}
              </div>
            </div>

            <div className="profile-actions">
              <button
                className="profile-button"
                onClick={() => {
                  setEditUser({
                    name: user.name,
                    email: user.email,
                    school: user.school || "",
                  });
                  setShowEditInfo(true);
                }}
              >
                Chỉnh sửa thông tin
              </button>
              <button
                className="profile-button"
                onClick={() => document.getElementById("avatarInput").click()}
              >
                Đổi ảnh đại diện
              </button>
              <button
                className="profile-button"
                onClick={() => setShowChangePassword(true)}
              >
                Đổi mật khẩu
              </button>
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
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
              <input
                className="popup"
                type="text"
                placeholder="Họ tên"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />

              <input
                className="popup"
                type="email"
                placeholder="Email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />

              <input
                className="popup"
                type="text"
                placeholder="Trường"
                value={editUser.school}
                onChange={(e) =>
                  setEditUser({ ...editUser, school: e.target.value })
                }
              />
            </div>
            <div className="popup-buttons">
              <button onClick={handleUpdateUser} className="popup-button">
                Cập nhật
              </button>
              <button
                className="popup-button cancel"
                onClick={() => {
                  setShowEditInfo(false);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {showChangePassword && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popup-title">Đổi mật khẩu</h3>
            <div className="popup-form">
              <input
                className="popup"
                type="password"
                placeholder="Mật khẩu cũ"
                value={passwordForm.oldPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    oldPassword: e.target.value,
                  })
                }
              />
              <input
                className="popup"
                type="password"
                placeholder="Mật khẩu mới"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
              />
              <input
                className="popup"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="popup-buttons">
              <button className="popup-button" onClick={handleChangePassword}>
                Cập nhật
              </button>
              <button
                className="popup-button cancel"
                onClick={() => setShowChangePassword(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Footer />
    </>
  );
};

export default UserProfile;