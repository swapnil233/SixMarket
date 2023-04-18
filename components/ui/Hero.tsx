const Hero = ({ heroButtonsLayout }: { heroButtonsLayout: any }) => {
  return (
    <div className="pt-10 md:pt-16 container flex flex-col w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <section className="text-center pb-12 md:pb-20">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl mb-4">
              Welcome to{" "}
              <span className="text-blue-800 font-medium">Marketplace</span>
            </h1>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-slate-600">
              Your one-stop destination for buying, selling, and trading goods
              within your community. Connect with local sellers and buyers to
              find unique items, hidden treasures, and amazing deals!
            </p>
          </div>
          <div className="max-w-[220px] mx-auto sm:max-w-none flex flex-col sm:flex-row sm:justify-center mt-6">
            {heroButtonsLayout}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
