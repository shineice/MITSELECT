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
              <a href="#contact" className="text-sm text-parchment/50 hover:text-parchment transition-colors">聯絡上架</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs text-earth tracking-[0.2em] uppercase mb-4">聯絡我們</h4>
            <div className="flex flex-col gap-3 text-sm text-parchment/50">
              <p>hello@mitselect.tw</p>
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-parchment/30 hover:text-earth transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-parchment/30 hover:text-earth transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-parchment/30 hover:text-earth transition-colors" aria-label="Threads">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.17.408-2.243 1.33-3.023.88-.744 2.084-1.168 3.59-1.264 1.07-.068 2.065.033 2.99.266-.034-.78-.202-1.407-.506-1.878-.398-.617-1.03-.93-1.878-.93h-.036c-.725.005-1.31.27-1.742.785l-1.46-1.212c.728-.878 1.79-1.357 3.167-1.387h.065c1.396 0 2.482.532 3.227 1.584.646.912.993 2.124 1.036 3.607.493.122.946.278 1.353.47 1.165.547 2.085 1.39 2.66 2.44.798 1.455.85 3.889-.81 5.514-1.834 1.796-4.097 2.534-7.324 2.56zM9.17 15.9c.042.752.458 1.368 1.173 1.737.622.32 1.406.47 2.209.427 1.09-.06 1.933-.472 2.508-1.228.46-.605.784-1.424.953-2.447-1.097-.304-2.297-.408-3.412-.332-1.726.117-2.778.775-2.862 1.355a1.3 1.3 0 00-.004.064l-.001.026.002.033c.005.12.015.237.029.354l-.595.011z"/>
                  </svg>
                </a>
              </div>
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
