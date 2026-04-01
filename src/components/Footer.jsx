export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-6 bg-graphite border-t border-parchment/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-parchment tracking-wider mb-2">MITSELECT</h3>
            <p className="text-xs text-parchment/40 tracking-[0.15em]">
              寫踮遮的故事 咱來傳出聲
            </p>
            <p className="text-xs text-parchment/30 mt-4 leading-relaxed">
              致力於發掘台灣在地品牌，<br />
              讓每一件好物都被看見。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs text-earth tracking-[0.2em] uppercase mb-4">導覽</h4>
            <div className="flex flex-col gap-3">
              <a href="#brands" className="text-sm text-parchment/50 hover:text-parchment transition-colors">探索品牌</a>
              <a href="#threads" className="text-sm text-parchment/50 hover:text-parchment transition-colors">在地聲音</a>
              <a href="#reviews" className="text-sm text-parchment/50 hover:text-parchment transition-colors">使用者回饋</a>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScAPatF0tPwUVlyIbkzeJOZmt_JhQkgHB8YtLraIdbjeDM5OQ/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="text-sm text-parchment/50 hover:text-parchment transition-colors">聯絡上架</a>
            </div>
          </div>

          {/* Brand Submission */}
          <div>
            <h4 className="text-xs text-earth tracking-[0.2em] uppercase mb-4">品牌上架</h4>
            <div className="flex flex-col gap-3 text-sm text-parchment/50">
              <p>想讓你的品牌被更多人看見？</p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScAPatF0tPwUVlyIbkzeJOZmt_JhQkgHB8YtLraIdbjeDM5OQ/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-earth hover:text-earth-light transition-colors"
              >
                填寫上架表單 →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-parchment/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-parchment/30">
            &copy; 2026 MITSELECT. All rights reserved.
          </p>
          <p className="text-[11px] text-parchment/20">
            Made with love in Taiwan
          </p>
        </div>
      </div>
    </footer>
  );
}
