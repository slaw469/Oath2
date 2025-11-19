import { TrendingDown, Lock, Users } from 'lucide-react';

const WhyOathWorks = () => {
  return (
    <section className="relative bg-background-dark py-32 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        {/* Decorative background lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg className="absolute left-0 top-40 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 0,100 L 50,80 L 100,90 L 150,60" stroke="#FCD34D" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute right-0 bottom-40 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 50,140 L 100,100 L 150,120 L 200,80" stroke="#EF4444" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative mb-20 text-center">
          <h2 className="text-5xl font-bold text-white mb-4">Why Oath Works</h2>
          <p className="text-lg text-white/70">
            Harnessing human psychology for ultimate discipline
          </p>
        </div>

        {/* Three Cards */}
        <div className="relative grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {/* Card 1: Loss Aversion */}
          <div className="group rounded-2xl border-2 border-white/20 bg-background-dark/80 p-8 transition-all hover:border-primary/50">
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <TrendingDown className="h-12 w-12 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="mb-6 text-center text-2xl font-bold text-white">
              Loss Aversion
            </h3>

            {/* Graph Visualization */}
            <div className="mb-6 h-40 relative">
              <div className="absolute inset-0 flex items-end justify-center">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/40">
                  <span>10%</span>
                  <span>4%</span>
                  <span>2%</span>
                  <span>0</span>
                </div>
                
                {/* Graph area */}
                <div className="ml-8 flex-1 h-full relative border-l border-b border-white/20">
                  {/* Line graph */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <polyline
                      points="0,100 20,85 40,95 60,80 80,90 100,60 120,30 140,10"
                      fill="none"
                      stroke="#FCD34D"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  
                  {/* Stake marker */}
                  <div className="absolute right-8 top-2 text-right">
                    <div className="text-xs text-danger mb-1">70%</div>
                    <div className="text-xs text-danger">Increase</div>
                  </div>
                  
                  {/* Red bar */}
                  <div className="absolute right-4 bottom-0 w-12 bg-danger/80 h-16"></div>
                  
                  {/* X-axis label */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-danger whitespace-nowrap">
                    Stake Introduced
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm leading-relaxed text-white/70 mt-8">
              The pain of losing money is{' '}
              <span className="text-danger font-semibold">powerful motivator</span>. Oth uses
              financial stakes to make meck, turning potentius into powerful incentives.
            </p>
          </div>

          {/* Card 2: Accountability Triggers */}
          <div className="group rounded-2xl border-2 border-white/20 bg-background-dark/80 p-8 transition-all hover:border-primary/50">
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Lock className="h-12 w-12 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="mb-6 text-center text-2xl font-bold text-white">
              Accountability Triggers
            </h3>

            {/* Bar Chart Visualization */}
            <div className="mb-6 h-40 relative">
              <div className="absolute inset-0 flex items-end justify-center">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/40">
                  <span>10%</span>
                  <span>5%</span>
                  <span>1%</span>
                  <span>0</span>
                </div>
                
                {/* Graph area */}
                <div className="ml-8 flex-1 h-full relative border-l border-b border-white/20">
                  {/* Bar chart */}
                  <div className="absolute inset-0 flex items-end justify-around gap-1 px-4">
                    {[20, 30, 25, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-green-500/60 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Percentage marker */}
                  <div className="absolute right-4 top-2 text-right">
                    <div className="text-xs text-green-500 mb-1">70%</div>
                    <div className="text-xs text-green-500">Increase</div>
                  </div>
                  
                  {/* X-axis label */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-green-500 whitespace-nowrap">
                    Daily Check-ins
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm leading-relaxed text-white/70 mt-8">
              Regular check-ins and public proof create clear feedback loop.
              Know statar. Know exactly what anat you need to do, and when need to do it, to succeed.
            </p>
          </div>

          {/* Card 3: Social Pressure */}
          <div className="group rounded-2xl border-2 border-white/20 bg-background-dark/80 p-8 transition-all hover:border-primary/50">
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Users className="h-12 w-12 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="mb-6 text-center text-2xl font-bold text-white">
              Social Pressure
            </h3>

            {/* Curve Chart Visualization */}
            <div className="mb-6 h-40 relative">
              <div className="absolute inset-0 flex items-end justify-center">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/40">
                  <span>20%</span>
                  <span>5%</span>
                  <span>1%</span>
                  <span>0</span>
                </div>
                
                {/* Graph area */}
                <div className="ml-8 flex-1 h-full relative border-l border-b border-white/20">
                  {/* Exponential curve */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M 0,120 Q 50,110 80,80 T 140,10"
                      fill="none"
                      stroke="#FCD34D"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  
                  {/* Arrow */}
                  <svg className="absolute right-8 top-6 w-8 h-8 text-primary">
                    <path
                      d="M 4,20 L 20,4 M 20,4 L 20,14 M 20,4 L 10,4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  
                  {/* Percentage marker */}
                  <div className="absolute right-4 top-2 text-right">
                    <div className="text-xs text-primary">73%</div>
                  </div>
                  
                  {/* X-axis label */}
                  <div className="absolute -bottom-6 right-8 text-xs text-primary whitespace-nowrap">
                    Friends Joined
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm leading-relaxed text-white/70 mt-8">
              Our platform connects you with rivals, amplifiay your drive.
              The desire <span className="text-primary font-semibold">to avoid losing face</span> (and
              {'('}men!{')'}) bends boosts your resolve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyOathWorks;

