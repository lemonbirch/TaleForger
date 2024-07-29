'use client'
import React from 'react';
import { Link } from 'lucide-react';
import NavButton from './NavButton';
import Modal from './ModalFunction';


import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'


const HeroSection = () => {
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem('user');
  console.log("userSession", userSession);
  console.log("user", user);
  return (
    <section className="bg-base-100 rounded-box shadow-xl mb-16 p-8">
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Unleash Your Imagination!</h2>
            <p className="text-lg mb-8">
              At StoryBuilder, we believe every child has a unique story to tell. Our fun and easy-to-use platform empowers kids to create their own storybooks from scratch. Dive into a world of creativity, where your imagination is the only limit!
            </p>
            <NavButton type="button" content="Get Started" path="/buildBook" />
            
          </div>
     
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
