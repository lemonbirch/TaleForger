'use client'
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import NavButton from '../components/NavButton';

const UserProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setDisplayName(currentUser.displayName || '');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateDisplayName = async () => {
    if (user && displayName.trim() !== '') {
      try {
        await updateProfile(user, { displayName: displayName.trim() });
        setIsEditing(false);
        setError('');
      } catch (error) {
        setError('Failed to update display name. Please try again.');
        console.error('Error updating display name:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to home page or login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to log out. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">User Profile</h1>
          <p className="text-lg mb-4">Please log in to view your profile.</p>
          <NavButton type="button" content="Log In" path="/login" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">User Profile</h1>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="bg-primary p-6">
            <h2 className="text-2xl font-bold text-primary-content">Personal Information</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              {isEditing ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input input-bordered flex-grow mr-2"
                  />
                  <button
                    onClick={handleUpdateDisplayName}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-900">{displayName || 'Not set'}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn  btn-sm"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <span className="text-lg text-gray-900">{user.email}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Created
              </label>
              <span className="text-lg text-gray-900">
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : 'Not available'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="bg-secondary p-6">
            <h2 className="text-2xl font-bold text-secondary-content">Subscription</h2>
          </div>
          <div className="p-6">
            <p className="text-lg text-gray-700 mb-4">Current Plan: <span className="font-semibold">Free</span></p>
            <button className="btn btn-outline btn-secondary">View Subscription Details</button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error shadow-lg mb-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="text-center">
          <button onClick={handleLogout} className="btn btn-error btn-wide">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;