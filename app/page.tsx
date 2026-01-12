import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PropertyGallery from '@/components/PropertyGallery';
import Location from '@/components/Location';
import EnquireForm from '@/components/EnquireForm';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

export default function Home() {
  return (
    <>
      <Preloader />
      <Navigation />
      <main className="overflow-x-hidden">
        <Hero />
        <PropertyGallery />
        <Location />
        <EnquireForm />
      </main>
      <Footer />
    </>
  );
}
