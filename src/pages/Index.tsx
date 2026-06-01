import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import TrustBar from '@/components/TrustBar';
import Services from '@/components/Services';
import Process from '@/components/Process';
import WhyUs from '@/components/WhyUs';
import TechStack from '@/components/TechStack';
import NvidiaInception from '@/components/NvidiaInception';
import UseCases from '@/components/UseCases';
import Studio from '@/components/Studio';
import FAQ from '@/components/FAQ';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <TrustBar />
        <Services />
        <Process />
        <WhyUs />
        <TechStack />
        <NvidiaInception />
        <UseCases />
        <Studio />
        <FAQ />
        <BookCall />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
