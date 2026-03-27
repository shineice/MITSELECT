import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandShowcase from './components/BrandShowcase';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import { useGoogleSheet } from './hooks/useGoogleSheet';

export default function App() {
  const { brands, categories, loading, error } = useGoogleSheet();
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredBrands = activeCategory === '全部'
    ? brands
    : brands.filter(b => b.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <Hero />
      <BrandShowcase
        brands={filteredBrands}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        loading={loading}
        error={error}
      />
      <Reviews />
      <Footer />
    </div>
  );
}
