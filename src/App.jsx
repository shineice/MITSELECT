import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandShowcase from './components/BrandShowcase';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { useGoogleSheet } from './hooks/useGoogleSheet';

export default function App() {
  const { brands, categories, categoryTree, loading, error } = useGoogleSheet();
  const [activeParent, setActiveParent] = useState('全部');
  const [activeChild, setActiveChild] = useState(null);

  const filteredBrands = activeParent === '全部'
    ? brands
    : activeChild
      ? brands.filter(b => b.parentCategory === activeParent && b.subCategory === activeChild)
      : brands.filter(b => b.parentCategory === activeParent);

  const handleParentChange = (parent) => {
    setActiveParent(parent);
    setActiveChild(null);
  };

  const handleChildChange = (parent, child) => {
    setActiveParent(parent);
    setActiveChild(child);
  };

  const activeCategory = activeParent === '全部'
    ? '全部'
    : activeChild || activeParent;

  return (
    <div className="min-h-screen">
      <Navbar
        categoryTree={categoryTree}
        activeParent={activeParent}
        activeChild={activeChild}
        onParentChange={handleParentChange}
        onChildChange={handleChildChange}
      />
      <Hero />
      <BrandShowcase
        brands={filteredBrands}
        categoryTree={categoryTree}
        activeParent={activeParent}
        activeChild={activeChild}
        activeCategory={activeCategory}
        onParentChange={handleParentChange}
        onChildChange={handleChildChange}
        loading={loading}
        error={error}
      />
      <Reviews />
      <Footer />
      <MobileBottomNav
        categoryTree={categoryTree}
        activeParent={activeParent}
        activeChild={activeChild}
        onParentChange={handleParentChange}
        onChildChange={handleChildChange}
      />
    </div>
  );
}
