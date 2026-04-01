import { useState, useEffect, useRef } from 'react';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScAPatF0tPwUVlyIbkzeJOZmt_JhQkgHB8YtLraIdbjeDM5OQ/viewform?usp=publish-editor';

export default function Navbar({ categoryTree, activeParent, activeChild, onParentChange, onChildChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  // Desktop: hover 中的母類別
  const [hoverParent, setHoverParent] = useState(null);
  // Mobile: 展開的母類別
  const [mobileExpandedParent, setMobileExpandedParent] = useState(null);
  const dropdownRef = useRef(null);

  const parentCategories = Object.keys(categoryTree);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSelectParent = (parent) => {
    onParentChange(parent);
    setCatOpen(false);
    setMenuOpen(false);
    setMobileExpandedParent(null);
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectChild = (parent, child) => {
    onChildChange(parent, child);
    setCatOpen(false);
    setMenuOpen(false);
    setMobileExpandedParent(null);
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-parchment/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Category Dropdown */}
        <div className="flex items-center gap-6">
          <a href="#" onClick={() => { onParentChange('全部'); }} className="flex flex-col leading-none">
            <span className={`font-serif text-2xl tracking-wider font-semibold transition-colors duration-500 ${scrolled ? 'text-graphite' : 'text-parchment'}`}>
              MITSELECT
            </span>
            <span className={`text-[10px] tracking-[0.2em] mt-0.5 transition-colors duration-500 ${scrolled ? 'text-warm-gray' : 'text-parchment/60'}`}>
              CRAFTED IN TAIWAN
            </span>
          </a>

          {/* Category Dropdown - Desktop */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={() => setCatOpen(!catOpen)}
              className={`flex items-center gap-1.5 text-sm tracking-wide transition-colors ${scrolled ? 'text-warm-gray hover:text-graphite' : 'text-parchment/70 hover:text-parchment'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span>探索分類</span>
              <svg className={`w-3 h-3 transition-transform ${catOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Pinkoi-style Mega Dropdown */}
            {catOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-earth/10 shadow-xl rounded-sm flex min-w-[480px]">
                {/* Left: 母類別 */}
                <div className="w-[180px] border-r border-earth/10 py-3">
                  <button
                    onClick={() => handleSelectParent('全部')}
                    onMouseEnter={() => setHoverParent(null)}
                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                      activeParent === '全部' ? 'text-earth font-medium bg-parchment' : 'text-graphite hover:bg-parchment/50'
                    }`}
                  >
                    全部品牌
                  </button>
                  {parentCategories.map(parent => (
                    <button
                      key={parent}
                      onClick={() => handleSelectParent(parent)}
                      onMouseEnter={() => setHoverParent(parent)}
                      className={`w-full text-left px-5 py-2.5 text-sm flex items-center justify-between transition-colors ${
                        activeParent === parent ? 'text-earth font-medium bg-parchment' : 'text-graphite hover:bg-parchment/50'
                      }`}
                    >
                      <span>{parent}</span>
                      {categoryTree[parent]?.length > 0 && (
                        <svg className="w-3 h-3 text-warm-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                {/* Right: 子類別 */}
                <div className="flex-1 py-3 min-h-[200px]">
                  {hoverParent && categoryTree[hoverParent]?.length > 0 ? (
                    <div className="px-4">
                      <p className="text-[10px] text-earth tracking-[0.15em] uppercase px-2 pb-2 mb-1 border-b border-earth/10">
                        {hoverParent}
                      </p>
                      {categoryTree[hoverParent].map(child => (
                        <button
                          key={child}
                          onClick={() => handleSelectChild(hoverParent, child)}
                          className={`w-full text-left px-2 py-2 text-sm transition-colors ${
                            activeParent === hoverParent && activeChild === child
                              ? 'text-earth font-medium'
                              : 'text-graphite hover:text-earth'
                          }`}
                        >
                          {child}
                        </button>
                      ))}
                      <button
                        onClick={() => handleSelectParent(hoverParent)}
                        className="w-full text-left px-2 py-2 text-sm font-medium text-graphite hover:text-earth mt-1 border-t border-earth/10"
                      >
                        所有 {hoverParent}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-warm-gray/40 text-sm">
                      ← 選擇分類查看子類別
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#brands" className={`text-sm tracking-wide transition-colors duration-300 ${scrolled ? 'text-warm-gray hover:text-graphite' : 'text-parchment/80 hover:text-parchment'}`}>
            探索品牌
          </a>
          <a href="#reviews" className={`text-sm tracking-wide transition-colors duration-300 ${scrolled ? 'text-warm-gray hover:text-graphite' : 'text-parchment/80 hover:text-parchment'}`}>
            使用者回饋
          </a>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className={`text-sm tracking-wide px-5 py-2 border transition-all duration-300 ${scrolled ? 'border-graphite text-graphite hover:bg-graphite hover:text-parchment' : 'border-parchment/50 text-parchment/80 hover:border-parchment hover:text-parchment'}`}>
            聯絡上架
          </a>
        </div>

        {/* Mobile: nothing here — bottom nav handles mobile navigation */}
      </div>


      {/* Click outside to close dropdown */}
      {catOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setCatOpen(false)} />}
    </nav>
  );
}
