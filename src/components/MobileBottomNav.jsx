const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScAPatF0tPwUVlyIbkzeJOZmt_JhQkgHB8YtLraIdbjeDM5OQ/viewform?usp=publish-editor';

export default function MobileBottomNav({ onParentChange }) {
  return (
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
          <svg className="w-5 h-5 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] text-warm-gray">首頁</span>
        </button>

        {/* Search - scroll to brands and focus search input */}
        <button
          onClick={() => {
            document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              document.querySelector('#brands input[type="text"]')?.focus();
            }, 400);
          }}
          className="flex flex-col items-center gap-1 px-4 py-1"
        >
          <svg className="w-5 h-5 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[10px] text-warm-gray">搜尋</span>
        </button>

        {/* Brands */}
        <button
          onClick={() => document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 px-4 py-1"
        >
          <svg className="w-5 h-5 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[10px] text-warm-gray">品牌</span>
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
  );
}
