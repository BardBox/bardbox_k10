import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PropertyGallery from '@/components/PropertyGallery';
import Location from '@/components/Location';
import EnquireForm from '@/components/EnquireForm';
import VirtualTour from '@/components/VirtualTour';
import Footer from '@/components/Footer';
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <Hero />
        <EnquireForm />
        <PropertyGallery />
        <Location />
        <VirtualTour />
      </main>
      <Footer />
    </>
  );
}
