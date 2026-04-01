import { useState } from 'react';
import BrandReview from './BrandReview';

export default function BrandShowcase({ brands, categoryTree, activeParent, activeChild, activeCategory, onParentChange, onChildChange, loading, error }) {
  const [expandedBrand, setExpandedBrand] = useState(null);

  if (loading) {
    return (
      <section id="brands" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-32 bg-earth/20 mx-auto rounded" />
            <div className="h-8 w-48 bg-earth/20 mx-auto rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-64 bg-earth/10 rounded-sm" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="brands" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-warm-gray">載入資料時發生錯誤，請稍後再試。</p>
          <p className="text-xs text-warm-gray/50 mt-2">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="brands" className="py-12 md:py-24 px-3 md:px-6 pb-24 md:pb-24 bg-parchment">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10">
          <p className="text-earth tracking-[0.3em] text-xs uppercase mb-2 md:mb-3 hidden md:block">Featured Brands</p>
          <h2 className="font-serif text-2xl md:text-4xl text-graphite">精選品牌</h2>
          <p className="text-xs md:text-sm text-warm-gray mt-2 md:mt-3">
            共 {brands.length} 個台灣品牌
            {activeCategory !== '全部' && <span className="text-earth"> — {activeCategory}</span>}
          </p>
          <div className="w-12 h-px bg-earth mx-auto mt-4 md:mt-6" />
        </div>

        {/* Category Filter - 母類別 (sticky on mobile) */}
        <div className="sticky top-0 z-20 bg-parchment py-2 md:py-0 md:static -mx-3 px-3 md:mx-0 md:px-0">
          <div className="flex md:flex-wrap md:justify-center gap-2 mb-2 md:mb-4 overflow-x-auto scrollbar-hide pb-1 md:pb-0">
            <button
              onClick={() => onParentChange('全部')}
              className={`px-4 py-1.5 text-xs tracking-wide border transition-all duration-300 whitespace-nowrap shrink-0 ${
                activeParent === '全部'
                  ? 'border-earth bg-earth text-parchment'
                  : 'border-earth/20 text-warm-gray hover:border-earth/50'
              }`}
            >
              全部
            </button>
            {Object.keys(categoryTree).map(parent => (
              <button
                key={parent}
                onClick={() => onParentChange(parent)}
                className={`px-4 py-1.5 text-xs tracking-wide border transition-all duration-300 whitespace-nowrap shrink-0 ${
                  activeParent === parent
                    ? 'border-earth bg-earth text-parchment'
                    : 'border-earth/20 text-warm-gray hover:border-earth/50'
                }`}
              >
                {parent}
              </button>
            ))}
          </div>

          {/* Category Filter - 子類別 (horizontal scroll on mobile) */}
          {activeParent !== '全部' && categoryTree[activeParent]?.length > 0 && (
            <div className="flex md:flex-wrap md:justify-center gap-2 mb-2 md:mb-4 overflow-x-auto scrollbar-hide pb-1 md:pb-0">
              <button
                onClick={() => onParentChange(activeParent)}
                className={`px-3 py-1 text-[11px] tracking-wide border rounded-full transition-all duration-300 whitespace-nowrap shrink-0 ${
                  !activeChild
                    ? 'border-earth/60 bg-earth/10 text-earth'
                    : 'border-earth/15 text-warm-gray hover:border-earth/40'
                }`}
              >
                全部{activeParent}
              </button>
              {categoryTree[activeParent].map(child => (
                <button
                  key={child}
                  onClick={() => onChildChange(activeParent, child)}
                  className={`px-3 py-1 text-[11px] tracking-wide border rounded-full transition-all duration-300 whitespace-nowrap shrink-0 ${
                    activeChild === child
                      ? 'border-earth/60 bg-earth/10 text-earth'
                      : 'border-earth/15 text-warm-gray hover:border-earth/40'
                  }`}
                >
                  {child}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4 md:mb-8" />

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="group bg-white rounded-lg md:rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 md:hover:-translate-y-1">
              {/* Image - mobile: small contained logo; desktop: cover image */}
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[3/2] bg-parchment">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain md:object-cover p-4 md:p-0 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-1.5 left-1.5 md:top-3 md:left-3">
                  <span className="px-1.5 py-0.5 md:px-2.5 md:py-1 bg-graphite/80 text-parchment text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] rounded-sm">
                    {brand.subCategory || brand.parentCategory}
                  </span>
                </div>
                {/* AI generated image label - hide on mobile */}
                <div className="absolute bottom-2 right-2 hidden md:block">
                  <span className="px-2 py-0.5 bg-black/40 backdrop-blur-sm text-white/70 text-[9px] tracking-wide rounded-sm">
                    示意圖 / AI Generated
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-2.5 md:p-5">
                <h3 className="font-serif text-sm md:text-lg text-graphite mb-1 md:mb-2 line-clamp-1">{brand.name}</h3>
                <p className="text-[10px] md:text-xs text-warm-gray leading-relaxed mb-2 md:mb-4 line-clamp-2 md:line-clamp-3">
                  {brand.description}
                </p>

                {/* Links: 品牌官網 + Threads - compact on mobile */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                  {brand.url && brand.url !== '#' && !brand.url.startsWith('miix') && (
                    <a
                      href={brand.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-graphite text-parchment text-[10px] md:text-[11px] tracking-wide hover:bg-earth transition-colors duration-300 rounded-sm"
                    >
                      <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="hidden md:inline">品牌</span>官網
                    </a>
                  )}
                  {brand.threadsUrl && (
                    <a
                      href={brand.threadsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 border border-graphite/20 text-graphite text-[10px] md:text-[11px] tracking-wide hover:border-earth hover:text-earth transition-colors duration-300 rounded-sm"
                    >
                      <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.17.408-2.243 1.33-3.023.88-.744 2.084-1.168 3.59-1.264 1.07-.068 2.065.033 2.99.266-.034-.78-.202-1.407-.506-1.878-.398-.617-1.03-.93-1.878-.93h-.036c-.725.005-1.31.27-1.742.785l-1.46-1.212c.728-.878 1.79-1.357 3.167-1.387h.065c1.396 0 2.482.532 3.227 1.584.646.912.993 2.124 1.036 3.607.493.122.946.278 1.353.47 1.165.547 2.085 1.39 2.66 2.44.798 1.455.85 3.889-.81 5.514-1.834 1.796-4.097 2.534-7.324 2.56z"/>
                      </svg>
                      <span className="hidden md:inline">Threads</span>
                    </a>
                  )}
                </div>

                {/* Review toggle - hide on mobile to save space */}
                <button
                  onClick={() => setExpandedBrand(expandedBrand === brand.id ? null : brand.id)}
                  className="hidden md:flex text-[11px] text-earth hover:text-graphite transition-colors items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  分享體驗
                  <svg className={`w-3 h-3 transition-transform ${expandedBrand === brand.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Per-brand review */}
              {expandedBrand === brand.id && (
                <div className="border-t border-earth/10 hidden md:block">
                  <BrandReview brandName={brand.name} />
                </div>
              )}
            </div>
          ))}
        </div>

        {brands.length === 0 && (
          <p className="text-center text-warm-gray mt-8">此分類目前沒有品牌</p>
        )}
      </div>
    </section>
  );
}
