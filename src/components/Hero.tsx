import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-screen">
      <Image
        src="https://via.placeholder.com/1920x1080"
        alt="Hero Image"
        fill
        style={{
          objectFit: 'cover',
        }}
        quality={100}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center text-white">
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
        <button className="mt-8 rounded-full bg-yellow-400 px-12 py-4 text-lg font-bold text-black shadow-lg shadow-yellow-400/50 transition-all hover:bg-yellow-500">
          START YOUR FIRST OATH
        </button>
      </div>
    </section>
  );
};

export default Hero;
