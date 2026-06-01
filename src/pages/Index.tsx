import { Head } from 'vite-react-ssg';
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
      <Head>
        <title>Custom AI Automation Solutions | Oltaflock AI</title>
        <meta
          name="description"
          content="Custom AI automation systems that eliminate repetitive work and unlock growth. Explore our AI agents and workflow automation. Schedule a free consultation today."
        />
        <link rel="canonical" href="https://oltaflock.ai/" />
        <meta property="og:title" content="Custom AI Automation Solutions | Oltaflock AI" />
        <meta
          property="og:description"
          content="Stop working IN your business. Start working ON it. Custom AI automation systems tailored to your needs."
        />
        <meta property="og:url" content="https://oltaflock.ai/" />
        <meta name="twitter:title" content="Custom AI Automation Solutions | Oltaflock AI" />
        <meta
          name="twitter:description"
          content="Stop working IN your business. Start working ON it. Custom AI automation systems tailored to your needs."
        />
      </Head>
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
