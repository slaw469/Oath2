import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.png"
          alt="Hero Image"
          fill
          style={{
            objectFit: 'cover',
          }}
          quality={100}
        />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center text-white">
        <h1 className="text-5xl font-bold">
          <span className="text-yellow-400">BET ON YOUR</span> DISCIPLINE.
        </h1>
        <h1 className="text-5xl font-bold">
          <span className="text-yellow-400">DEFEAT YOUR</span> DOUBTS.
        </h1>
        <p className="mt-6 text-xl">
          Put real money on your habits, challenge your friends, and
          <br />
          automatially win or lose based your commintments.
        </p>
        <Link 
          href="/dashboard"
          className="mt-8 inline-block rounded-full bg-yellow-400 px-12 py-4 text-lg font-bold text-black shadow-lg shadow-yellow-400/50 transition-all hover:bg-yellow-500"
        >
          START YOUR FIRST OATH
        </Link>
      </div>
    </section>
  );
};

export default Hero;
