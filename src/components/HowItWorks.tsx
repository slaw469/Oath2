import { Target, Scale, Zap, DollarSign, Clock } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="relative bg-background-dark py-32 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        {/* Decorative background lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg className="absolute left-0 top-20 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 0,100 L 50,80 L 100,90 L 150,60" stroke="#FCD34D" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute right-0 top-32 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 50,60 L 100,40 L 150,55 L 200,30" stroke="#FCD34D" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute left-20 bottom-40 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 0,100 L 50,120 L 100,110 L 150,140" stroke="#EF4444" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute right-0 bottom-20 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 50,140 L 100,100 L 150,120 L 200,80" stroke="#EF4444" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {/* Step 1: Choose Your Oath */}
          <div className="group rounded-2xl border-2 border-primary/30 bg-background-dark px-12 py-16 min-h-[500px] flex flex-col justify-center transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20">
            <div className="mb-10 flex justify-center">
              <div className="relative p-6 rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <Target className="h-24 w-24 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="mb-6 text-center text-2xl font-bold text-primary uppercase tracking-wider">
              1. CHOOSE YOUR OATH
            </h3>
            <p className="text-center text-base leading-relaxed text-white/70">
              Browse hundreds of challenge ideas or create in own. Pick a habit, set a duration, and find your rival.
            </p>
          </div>

          {/* Step 2: Set the Stakes */}
          <div className="group rounded-2xl border-2 border-primary/30 bg-background-dark px-12 py-16 min-h-[500px] flex flex-col justify-center transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20">
            <div className="mb-10 flex justify-center">
              <div className="relative p-6 rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <div className="relative">
                  <Scale className="h-24 w-24 text-primary" strokeWidth={1.5} />
                  <DollarSign className="absolute -bottom-2 -right-2 h-12 w-12 text-primary bg-background-dark rounded-full p-1" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h3 className="mb-6 text-center text-2xl font-bold text-primary uppercase tracking-wider">
              2. SET THE STAKES
            </h3>
            <p className="text-center text-base leading-relaxed text-white/70">
              Put real money on the line with friends. Agree on a pot, and Oath handles the automatic payouts.
            </p>
          </div>

          {/* Step 3: Prove It or Pay */}
          <div className="group rounded-2xl border-2 border-primary/30 bg-background-dark px-12 py-16 min-h-[500px] flex flex-col justify-center transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20">
            <div className="mb-10 flex justify-center">
              <div className="relative p-6 rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <div className="relative">
                  <Zap className="h-24 w-24 text-primary" strokeWidth={1.5} fill="currentColor" />
                  <Clock className="absolute -bottom-2 -right-2 h-12 w-12 text-primary bg-background-dark rounded-full p-1" strokeWidth={2} />
                </div>
              </div>
            </div>
            <h3 className="mb-6 text-center text-2xl font-bold text-primary uppercase tracking-wider">
              3. PROVE IT OR PAY
            </h3>
            <p className="text-center text-base leading-relaxed text-white/70">
              Submit daily proof of completion. Miss a check-in, the pot automatically goes to your opponent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
