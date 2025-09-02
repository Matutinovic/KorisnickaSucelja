import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10 pt-20">
      {" "}
      {/* Dodan pt-20 za pomak dolje */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-8 text-center">
        About Us
      </h1>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="text-lg sm:text-xl text-gray-700">
          We are two passionate students from the Faculty of Electrical
          Engineering, Mechanical Engineering and Naval Architecture (FESB) in
          Split, Croatia – myself and my friend Toni Matutinović. Our love for
          fitness, healthy living, and various sports has led us to the gym,
          where we noticed a common challenge: many people train based on feel
          rather than a structured plan. This inspired us to develop this
          application with a focus on progressive overload, ensuring users can
          track their training process systematically.
        </p>
        <p className="text-lg sm:text-xl text-gray-700">
          Our goal was to create a tool that provides clear insight into whether
          you are progressing or plateauing. By logging training plans,
          selecting specific weeks, and recording exercises with sets,
          repetitions, and weights, users can monitor their journey with
          precision. This app reflects our dedication to helping others achieve
          their fitness goals through data-driven decisions.
        </p>
        <p className="text-lg sm:text-xl text-gray-700">
          Built from scratch during our studies, this project combines our
          technical skills with our personal fitness experience. We aim to
          expand its features, improve user experience, and support a community
          of fitness enthusiasts who value measurable progress. Thank you for
          joining us on this journey – your feedback will shape the future of
          this app!
        </p>
      </div>
    </main>
  );
}
