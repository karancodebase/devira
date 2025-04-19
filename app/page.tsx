'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from './components/Navbar';

const features = [
  {
    icon: '🔥',
    title: 'Streak Tracking',
    desc: 'Monitor your daily progress on GitHub, LeetCode, and college attendance.',
  },
  {
    icon: '🖼️',
    title: 'NFT Milestones',
    desc: 'Earn unique NFTs as you achieve coding and attendance milestones.',
  },
  {
    icon: '🔗',
    title: 'Web3 Powered',
    desc: 'Connect your wallet and receive rewards on Arbitrum testnet.',
  },
];

export default function Home() {
  // Refs for animation
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animate hero
    gsap.fromTo(
      heroRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
    // Animate feature cards with stagger
    gsap.fromTo(
      cardsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.5, ease: 'power3.out' }
    );
    // Animate CTA button
    gsap.fromTo(
      ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, delay: 1.2, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-800/30  to-black flex flex-col">
      {/* Navigation (optional) */}
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="flex flex-col items-center text-center mt-16 mb-12 px-4"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-400 text-transparent bg-clip-text mb-4 drop-shadow-lg">
          Track. Achieve. Collect.
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 max-w-xl mb-8">
          Sync your coding journey, maintain streaks, and unlock exclusive NFTs for your achievements!
        </p>
        <button
          ref={ctaRef}
          onClick={() => (window.location.href = '/login')}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4 py-10">
          {features.map((f, i) => (
          <div
          key={f.title}
          ref={el => {
            cardsRef.current[i] = el; // Removed non-null assertion (!)
          }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform"
        >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-indigo-400">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Devira. All rights reserved.
      </footer>
    </main>
  );
}
