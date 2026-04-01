import { useState } from 'react';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScAPatF0tPwUVlyIbkzeJOZmt_JhQkgHB8YtLraIdbjeDM5OQ/viewform?usp=publish-editor';

export default function MobileBottomNav({ categoryTree, activeParent, activeChild, onParentChange, onChildChange }) {
  const [showCategories, setShowCategories] = useState(false);
  const [expandedParent, setExpandedParent] = useState(null);
  const parentCategories = Object.keys(categoryTree);

  const handleSelectParent = (parent) => {
    onParentChange(parent);
    setShowCategories(false);
    setExpandedParent(null);
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectChild = (parent, child) => {
    onChildChange(parent, child);
    setShowCategories(false);
    setExpandedParent(null);
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Category Bottom Sheet */}
      {showCategories && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => { setShowCategories(false); setExpandedParent(null); }}
          />
          {/* Sheet */}
          <div className="absolute bottom-[60px] left-0 right-0 bg-parchment rounded-t-2xl max-h-[70vh] overflow-y-auto animate-slide-up">
            {/* Handle */}
            <div className="sticky top-0 bg-parchment pt-3 pb-2 flex justify-center rounded-t-2xl">
              <div className="w-10 h-1 bg-earth/20 rounded-full" />
            </div>

            <div className="px-5 pb-6">
              <h3 className="text-sm font-medium text-graphite mb-4">探索分類</h3>

              {/* 全部 */}
              <button
                onClick={() => handleSelectParent('全部')}
                className={`w-full text-left py-3 px-4 rounded-lg mb-1 text-sm transition-colors ${
                  activeParent === '全部' ? 'bg-earth/10 text-earth font-medium' : 'text-graphite active:bg-earth/5'
                }`}
              >
                全部品牌
              </button>

              {/* Parent + Children */}
              {parentCategories.map(parent => (
                <div key={parent}>
                  <button
                    onClick={() => setExpandedParent(expandedParent === parent ? null : parent)}
                    className={`w-full text-left py-3 px-4 rounded-lg mb-0.5 text-sm flex items-center justify-between transition-colors ${
                      activeParent === parent ? 'bg-earth/10 text-earth font-medium' : 'text-graphite active:bg-earth/5'
                    }`}
                  >
                    <span>{parent}</span>
                    {categoryTree[parent]?.length > 0 && (
                      <svg className={`w-4 h-4 text-warm-gray transition-transform duration-200 ${expandedParent === parent ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Children */}
                  {expandedParent === parent && categoryTree[parent]?.length > 0 && (
                    <div className="ml-4 pl-3 border-l-2 border-earth/15 mb-2">
                      {categoryTree[parent].map(child => (
                        <button
                          key={child}
                          onClick={() => handleSelectChild(parent, child)}
                          className={`w-full text-left py-2.5 px-3 rounded-lg text-sm transition-colors ${
                            activeParent === parent && activeChild === child
                              ? 'text-earth font-medium bg-earth/5'
                              : 'text-warm-gray active:bg-earth/5'
                          }`}
                        >
                          {child}
                        </button>
                      ))}
                      <button
                        onClick={() => handleSelectParent(parent)}
                        className="w-full text-left py-2 px-3 text-xs text-earth font-medium"
                      >
                        所有 {parent} →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-earth/10 safe-area-bottom">
        <div className="flex items-center justify-around h-[60px]">
          {/* Home */}
          <button
            onClick={() => {
              onParentChange('全部');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <svg className={`w-5 h-5 ${activeParent === '全部' ? 'text-earth' : 'text-warm-gray'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className={`text-[10px] ${activeParent === '全部' ? 'text-earth font-medium' : 'text-warm-gray'}`}>首頁</span>
          </button>

          {/* Categories */}
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <svg className={`w-5 h-5 ${showCategories ? 'text-earth' : 'text-warm-gray'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className={`text-[10px] ${showCategories ? 'text-earth font-medium' : 'text-warm-gray'}`}>分類</span>
          </button>

          {/* Search / Brands */}
          <button
            onClick={() => document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <svg className="w-5 h-5 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[10px] text-warm-gray">探索</span>
          </button>

          {/* Submit Brand */}
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <svg className="w-5 h-5 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-[10px] text-warm-gray">上架</span>
          </a>
        </div>
      </nav>
    </>
  );
}
