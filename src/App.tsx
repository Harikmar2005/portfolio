/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { profileData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ThreatSurfaceSection } from './components/ThreatSurfaceSection';
import { SelectedProjects } from './components/SelectedProjects';
import { AboutSection } from './components/AboutSection';
import { WorkbenchSection } from './components/WorkbenchSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#090B0E] text-[#F3F5F7] font-sans antialiased selection:bg-[#B7FF5A] selection:text-[#090B0E]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="space-y-6">
        {/* Home / Hero Section */}
        <HeroSection profileData={profileData} />

        {/* Threat Surface / Network Intelligence Interactive Graph */}
        <ThreatSurfaceSection />

        {/* Selected Projects — Exactly 4 Projects */}
        <SelectedProjects />

        {/* About Section — Curiosity is the Starting Point */}
        <AboutSection profileData={profileData} />

        {/* Skills Section — Tools in the Workbench */}
        <WorkbenchSection />

        {/* Resume Section — The Engineer Behind the Systems */}
        <ResumeSection />

        {/* Contact Section — Let's Build Something That Holds Up Under Scrutiny */}
        <ContactSection profileData={profileData} />
      </main>

      {/* Lab Station Footer */}
      <FooterSection />
    </div>
  );
}
