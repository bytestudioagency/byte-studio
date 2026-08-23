const words = [
  "DREAM.",
  "BUILD.",
  "LAUNCH.",
  "THINK.",
  "DESIGN.",
  "CODE.",
  "SHIP.",
  "HUSTLE.",
  "MVP.",
  "VISION.",
];

const Ticker = () => {
  const track = [...words, ...words];

  return (
    <div
      className="relative z-30 my-10 md:my-14 lg:my-16 w-full py-[2.5vw] overflow-x-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="w-[120%] -ml-[10%] py-2 md:py-2.5 bg-blue-600 -rotate-2 origin-center shadow-[0_0_40px_-5px_rgba(17,44,199,0.7)]">
        <div className="flex w-max ticker-track">
          {track.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="mx-3 md:mx-4 text-xl md:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight whitespace-nowrap text-white"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ticker;
