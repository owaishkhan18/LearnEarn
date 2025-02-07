import { useState } from "react";
import { FaTimes } from "react-icons/fa";
const ProfileModal = ({ profile = {}, setProfile, onClose }) => {
    // Provide default values for missing properties
    const defaultProfile = {
      name: "",
      subject: "",
      bio: "",
      qualifications: [],
      experience: 0,
      teachingStyle: "",
      profilePicture: "",
      socialLinks: {},
    };
  
    const [editProfile, setEditProfile] = useState({ ...defaultProfile, ...profile });
  
    const handleSave = () => {
      setProfile(editProfile);
      onClose();
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Profile</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
              <FaTimes size={20} />
            </button>
          </div>
  
          {/* Profile Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                value={editProfile.name}
                onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Subject</label>
              <input
                type="text"
                value={editProfile.subject}
                onChange={(e) => setEditProfile({ ...editProfile, subject: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Qualifications</label>
              <input
                type="text"
                value={editProfile.qualifications.join(", ")}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, qualifications: e.target.value.split(", ") })
                }
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Experience (Years)</label>
              <input
                type="number"
                value={editProfile.experience}
                onChange={(e) => setEditProfile({ ...editProfile, experience: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Teaching Style</label>
              <input
                type="text"
                value={editProfile.teachingStyle}
                onChange={(e) => setEditProfile({ ...editProfile, teachingStyle: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Profile Picture URL</label>
              <input
                type="text"
                value={editProfile.profilePicture}
                onChange={(e) => setEditProfile({ ...editProfile, profilePicture: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Social Links</label>
              <input
                type="text"
                value={Object.values(editProfile.socialLinks).join(", ")}
                onChange={(e) =>
                  setEditProfile({
                    ...editProfile,
                    socialLinks: e.target.value.split(", ").reduce((acc, link, i) => {
                      acc[`link${i + 1}`] = link;
                      return acc;
                    }, {}),
                  })
                }
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
  
          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileModal;
  