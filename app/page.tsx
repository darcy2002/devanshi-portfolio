import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import StackStrip from '@/components/StackStrip';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <Nav />
      <Hero />
      <StackStrip />
      <Projects />
      <About />
      <Footer />
    </main>
  );
}
