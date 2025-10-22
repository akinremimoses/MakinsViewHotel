"use client";

import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useMutation } from "@apollo/client/react";
import { User, Mail, Phone, Camera, Save, X, Image as ImageIcon } from "lucide-react";
// import { CldImage } from "@cloudinary/react";
import { CldImage } from "next-cloudinary";
import { Cloudinary } from "@cloudinary/url-gen";

interface UserProfile {
  _id: string;
  surname: string;
  middlename: string;  email: string;
  phonenumber: string;
  profileImage?: string;
  role: string;
  createdAt: string;
}

interface UserData {
  me: UserProfile;
}

const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      _id
      surname
      middlename
      email
      phonenumber
      profileImage
      role
      createdAt
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($updates: UserProfileInput!) {
    updateUserProfile(updates: $updates) {
      _id
      surname
      middlename
      email
      phonenumber
      profileImage
      role
      createdAt
    }
  }
`;

const UPLOAD_PROFILE_IMAGE = gql`
  mutation UploadProfileImage($imageUrl: String!) {
    uploadProfileImage(imageUrl: $imageUrl) {
      _id
      profileImage
    }
  }
`;

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    surname: "",
    middlename: "",
    email: "",
    phonenumber: "",
  });
  const [uploading, setUploading] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const fileInputRef = useState<HTMLInputElement | null>(null);

  const { loading, error, data, refetch } = useQuery<UserData>(GET_USER_PROFILE);
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
  const [uploadProfileImage] = useMutation(UPLOAD_PROFILE_IMAGE);

  useEffect(() => {
    if (data?.me) {
      setFormData({
        surname: data.me.surname,
        middlename: data.me.middlename || "",
        email: data.me.email,
        phonenumber: data.me.phonenumber,
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        variables: {
          updates: {
            surname: formData.surname,
            middlename: formData.middlename,
            phonenumber: formData.phonenumber,
          },
        },
      });
      setIsEditing(false);
      refetch();
      alert("Profile updated successfully! ✅");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile ❌");
    }
  };

  const handleCancel = () => {
    if (data?.me) {
      setFormData({
        surname: data.me.surname,
        middlename: data.me.middlename || "",
        email: data.me.email,
        phonenumber: data.me.phonenumber,
      });
    }
    setIsEditing(false);
  };

  // Handle file selection from gallery
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadToCloudinary(file);
    }
    // Reset the input
    event.target.value = '';
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    setShowUploadOptions(false);

    try {
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'makinsviewhotel'); // Replace with your upload preset
      
      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (result.secure_url) {
        // Save to database
        await uploadProfileImage({
          variables: {
            imageUrl: result.secure_url,
          },
        });
        refetch();
        alert("Profile image updated successfully! ✅");
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image ❌");
    } finally {
      setUploading(false);
    }
  };

  // Open file selector
  const openFileSelector = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        uploadToCloudinary(file);
      }
    };
    input.click();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-600">Error loading profile: {error.message}</p>
    </div>
  );

  if (!data?.me) return (
    <div className="min-h-screen flex items-center justify-center">
      <p>User not found</p>
    </div>
  );

  const user = data.me;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {user.profileImage ? (
                <CldImage
                  width="150"
                  height="150"
                  src={user.profileImage}
                  alt="Profile"
                  className="rounded-full object-cover border-4 border-blue-100"
                  crop="fill"
                  gravity="face"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-200">
                  <User className="w-16 h-16 text-blue-400" />
                </div>
              )}
              
              {/* Upload Button */}
              <div className="relative">
                <button
                  onClick={() => setShowUploadOptions(!showUploadOptions)}
                  disabled={uploading}
                  className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {uploading ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </button>

                {/* Upload Options Dropdown */}
                {showUploadOptions && (
                  <div className="absolute bottom-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-48 z-10">
                    <button
                      onClick={openFileSelector}
                      className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Choose from Gallery
                    </button>
                    
                    {/* Hidden file input for gallery selection */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-input"
                    />
                    
                    {/* Optional: Direct camera capture for mobile */}
                    <button
                      onClick={openFileSelector}
                      className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {user.surname} {user.middlename}
              </h2>
              <p className="text-gray-600 capitalize">{user.role}</p>
              {uploading && (
                <p className="text-blue-600 text-sm mt-1">Uploading image...</p>
              )}
            </div>
          </div>

          {/* User ID Information */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600 font-medium">User ID:</span>
                <p className="text-gray-700 font-mono break-all text-xs mt-1">{user._id}</p>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Member Since:</span>
                <p className="text-gray-700 mt-1">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Surname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surname
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <User className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 outline-none bg-transparent disabled:bg-transparent disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Middlename */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Middlename
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <User className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    name="middlename"
                    value={formData.middlename}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 outline-none bg-transparent disabled:bg-transparent disabled:text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <Mail className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="flex-1 outline-none bg-transparent text-gray-600"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <Phone className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="tel"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="flex-1 outline-none bg-transparent disabled:bg-transparent disabled:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                <User className="w-5 h-5 mr-2" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showUploadOptions && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowUploadOptions(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;