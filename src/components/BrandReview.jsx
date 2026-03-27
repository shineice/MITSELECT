import { useState } from 'react';

function StarRating({ rating, onRate, interactive = false }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={() => interactive && onRate(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`text-sm transition-colors ${interactive ? 'cursor-pointer' : 'cursor-default'} ${
            star <= (hovered || rating) ? 'text-earth' : 'text-earth/20'
          }`}
          disabled={!interactive}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
}

// async function submitToDatabase(data) {
//   // TODO: 串接實際 API
//   // const response = await fetch('/api/reviews', {
//   //   method: 'POST',
//   //   headers: { 'Content-Type': 'application/json' },
//   //   body: JSON.stringify(data),
//   // });
//   // return response.json();
// }

export default function BrandReview({ brandName }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.comment || form.rating === 0) return;

    console.log(`Review for ${brandName}:`, form);

    const newReview = {
      id: reviews.length + 1,
      ...form,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([newReview, ...reviews]);
    setForm({ name: '', rating: 0, comment: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-4 bg-parchment/50">
      {/* Existing reviews */}
      {reviews.length > 0 && (
        <div className="space-y-3 mb-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white p-3 rounded-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-graphite">{r.name}</span>
                <span className="text-[10px] text-warm-gray">{r.date}</span>
              </div>
              <StarRating rating={r.rating} />
              <p className="text-xs text-warm-gray mt-1">{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      {submitted && (
        <div className="mb-3 p-2 bg-earth/10 text-earth text-xs rounded-sm text-center">
          感謝你的回饋！
        </div>
      )}

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="text-[10px] text-warm-gray block mb-1">評分</label>
          <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} interactive />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="flex-1 px-3 py-1.5 border border-earth/15 bg-white text-xs text-graphite focus:outline-none focus:border-earth"
            placeholder="你的名字"
          />
        </div>
        <textarea
          rows={2}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full px-3 py-1.5 border border-earth/15 bg-white text-xs text-graphite focus:outline-none focus:border-earth resize-none"
          placeholder={`分享你對 ${brandName} 的體驗...`}
        />
        <button
          type="submit"
          className="w-full py-1.5 bg-graphite text-parchment text-[11px] tracking-wider hover:bg-earth transition-colors"
        >
          送出
        </button>
      </form>
    </div>
  );
}
