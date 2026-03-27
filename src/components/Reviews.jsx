import { reviews } from '../data/brands';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-earth tracking-[0.3em] text-xs uppercase mb-3">Feedback</p>
          <h2 className="font-serif text-3xl md:text-4xl text-graphite">使用者回饋</h2>
          <div className="w-12 h-px bg-earth mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="bg-parchment p-6 rounded-sm border border-earth/10">
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className={`text-sm ${s <= review.rating ? 'text-earth' : 'text-earth/20'}`}>&#9733;</span>
                ))}
              </div>
              <p className="text-sm text-graphite/80 leading-relaxed mb-4">{review.comment}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-graphite">{review.name}</span>
                <span className="text-[10px] text-warm-gray">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
