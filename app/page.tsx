'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';

const PageWrapper = dynamic(() => import('@/components/layout/PageWrapper'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: false });
const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), { ssr: false });
const TeamSection = dynamic(() => import('@/components/sections/TeamSection'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), { ssr: false });

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <div className="relative bg-[#281C20]">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <TeamSection />
        <ContactSection />
      </div>
    </PageWrapper>
  );
}
