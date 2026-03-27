import { useState, useEffect } from 'react';

export default function Navbar({ categories, activeCategory, onCategoryChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCat = (cat) => {
    onCategoryChange(cat);
    setCatOpen(false);
    setMenuOpen(false);
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-parchment/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Category Dropdown */}
        <div className="flex items-center gap-6">
          <a href="#" onClick={() => onCategoryChange('全部')} className="flex flex-col leading-none">
            <span className="font-serif text-2xl tracking-wider text-graphite font-semibold">
              MITSELECT
            </span>
            <span className="text-[10px] tracking-[0.2em] text-warm-gray mt-0.5">
              CRAFTED IN TAIWAN
            </span>
          </a>

          {/* Category Dropdown - Desktop */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-1.5 text-sm tracking-wide text-warm-gray hover:text-graphite transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span>探索分類</span>
              <svg className={`w-3 h-3 transition-transform ${catOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {catOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-earth/10 shadow-lg rounded-sm py-2 min-w-[160px] max-h-[400px] overflow-y-auto">
                <button
                  onClick={() => handleCat('全部')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-parchment transition-colors ${
                    activeCategory === '全部' ? 'text-earth font-medium' : 'text-graphite'
                  }`}
                >
                  全部品牌
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCat(cat)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-parchment transition-colors ${
                      activeCategory === cat ? 'text-earth font-medium' : 'text-graphite'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#brands" className="text-sm tracking-wide text-warm-gray hover:text-graphite transition-colors duration-300">
            探索品牌
          </a>
          <a href="#reviews" className="text-sm tracking-wide text-warm-gray hover:text-graphite transition-colors duration-300">
            使用者回饋
          </a>
          <a href="#contact" className="text-sm tracking-wide px-5 py-2 border border-graphite text-graphite hover:bg-graphite hover:text-parchment transition-all duration-300">
            聯絡上架
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => { setMenuOpen(!menuOpen); setCatOpen(false); }}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-px bg-graphite transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`w-6 h-px bg-graphite transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-graphite transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 bg-parchment/95 backdrop-blur-md ${
        menuOpen ? 'max-h-[500px]' : 'max-h-0'
      }`}>
        <div className="px-6 py-4 flex flex-col gap-3">
          <p className="text-[10px] text-earth tracking-[0.2em] uppercase">分類</p>
          <div className="flex flex-wrap gap-2 mb-2">
            <button
              onClick={() => handleCat('全部')}
              className={`px-3 py-1 text-xs border transition-colors ${
                activeCategory === '全部'
                  ? 'border-earth bg-earth text-parchment'
                  : 'border-earth/30 text-warm-gray'
              }`}
            >
              全部
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCat(cat)}
                className={`px-3 py-1 text-xs border transition-colors ${
                  activeCategory === cat
                    ? 'border-earth bg-earth text-parchment'
                    : 'border-earth/30 text-warm-gray'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <a href="#brands" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide text-warm-gray">探索品牌</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide text-warm-gray">使用者回饋</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide px-5 py-2 border border-graphite text-graphite text-center">聯絡上架</a>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {catOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setCatOpen(false)} />}
    </nav>
  );
}
