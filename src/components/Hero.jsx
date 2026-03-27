import { useEffect, useRef } from 'react';

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const els = [titleRef.current, subtitleRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 250);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-graphite">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/50 via-graphite/30 to-graphite/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-earth-light tracking-[0.4em] text-xs mb-6 uppercase">
          Crafted in Taiwan
        </p>
        <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl lg:text-8xl text-parchment font-semibold tracking-wide leading-tight">
          MITSELECT
        </h1>
        <p ref={subtitleRef} className="mt-6 text-lg md:text-xl text-earth-light/90 font-light leading-relaxed max-w-2xl mx-auto">
          找尋屬於台灣的故事
        </p>
        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#brands"
            className="px-8 py-3 bg-earth text-parchment text-sm tracking-widest hover:bg-earth-light hover:text-graphite transition-all duration-500"
          >
            探索品牌
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-parchment/40 text-parchment/80 text-sm tracking-widest hover:border-parchment hover:text-parchment transition-all duration-500"
          >
            品牌上架
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-parchment/40 text-[10px] tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-parchment/40 to-transparent" />
      </div>
    </section>
  );
}
