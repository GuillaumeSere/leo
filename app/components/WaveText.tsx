"use client";

type Props = { text: string };

export default function WaveText({ text }: Props) {
  return (
    <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-300 drop-shadow-lg flex justify-center flex-wrap">
        😂 
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block animate-bounce"
          style={{
            animationDelay: `${i * 0.05}s`, // décalage pour effet vague
            animationDuration: "0.8s",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}
