import Image from 'next/image';

const HowItWorks = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <Image
          src="/how-it-works.png"
          alt="How it works"
          width={1200}
          height={600}
          className="mx-auto"
        />
      </div>
    </section>
  );
};

export default HowItWorks;
