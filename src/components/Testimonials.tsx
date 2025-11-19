import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex R.",
      username: "@AlexTheChamp",
      avatar: "👨🏻",
      rating: 5,
      text: "\"Oath finally made me stick to gym routine. The stakes were rere real, and so uo were results!\"",
      challenge: "Gym Streak",
      won: null
    },
    {
      name: "Sarah L.",
      username: "@SarahWins",
      avatar: "👩🏿",
      rating: 4.5,
      text: "\"I used procasttiate coding, but with but with, with tyou shipped app time and won big!\"",
      challenge: "Code Commitments",
      won: "$150"
    },
    {
      name: "Omar D.",
      username: "@DesertEagle",
      avatar: "👨🏻‍🦱",
      rating: 5,
      text: "\"My mornings are sacred now. Completed 30-day meditation streek and felt and df mental rewards\"",
      challenge: "100% Completion",
      won: "$200"
    }
  ];

  return (
    <section className="relative bg-background-dark py-32 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        {/* Decorative background lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg className="absolute left-0 top-40 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 0,100 L 50,80 L 100,90 L 150,60" stroke="#FCD34D" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute right-20 top-60 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 50,60 L 100,40 L 150,55 L 200,30" stroke="#FCD34D" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative mb-16 text-center">
          <h2 className="text-5xl font-bold text-primary mb-4">Hear From Our Victors</h2>
          <p className="text-lg text-white/70">
            Real Oaths, Real Discipline, Real Wins.
          </p>
        </div>

        {/* User Cards - Top Row */}
        <div className="relative max-w-6xl mx-auto mb-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-danger/5 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 h-24 w-24 rounded-full bg-white/10 flex items-center justify-center text-5xl border-2 border-primary/30">
                    {testimonial.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{testimonial.name}</h3>
                  <p className="text-sm text-white/60 mb-3">{testimonial.username}</p>
                  {testimonial.won && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/60">Won</span>
                      <span className="text-lg font-bold text-primary">{testimonial.won}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Cards - Bottom Row */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`rounded-2xl border-2 ${
                  index === 0 ? 'border-primary/40 bg-gradient-to-br from-primary/10 to-transparent' : 
                  index === 1 ? 'border-primary/40 bg-gradient-to-br from-primary/5 to-transparent' :
                  'border-white/20 bg-background-dark/80'
                } p-6 transition-all hover:border-primary`}
              >
                {/* Stars */}
                <div className="mb-4 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(testimonial.rating)
                          ? 'fill-primary text-primary'
                          : i < testimonial.rating
                          ? 'fill-primary/50 text-primary'
                          : 'fill-none text-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-center text-sm leading-relaxed text-white/90 italic min-h-[100px]">
                  {testimonial.text}
                </p>

                {/* Challenge info */}
                <div className="border-t border-white/10 pt-4 text-center">
                  <p className="text-xs text-white/50 mb-1">— Completed "{testimonial.challenge}"</p>
                  {testimonial.won && (
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <span className="text-xs text-white/60">100% Completion</span>
                      <span className="text-sm font-bold text-primary">Won {testimonial.won}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="relative mt-16 text-center">
          <button className="rounded-full bg-primary px-12 py-4 text-lg font-bold text-black shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105">
            Start Your First Oath
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

