import Nav from '../components/Nav';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Demo from '../components/Demo';
import Features from '../components/Features';
import BlogPreview from '../components/BlogPreview';
import Footer from '../components/Footer';
import { getAllPosts } from '../lib/posts';

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Demo />
        <HowItWorks />
        <Features />
        <BlogPreview posts={recentPosts} />
      </main>
      <Footer />
    </>
  );
}
