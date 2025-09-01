import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10 pt-20"> {/* Dodan pt-20 za pomak dolje */}
      <h1 className="text-6xl font-extrabold tracking-tight mb-8">Contact</h1>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="text-lg sm:text-xl text-gray-700">
          We’d love to hear from you! Whether you have questions about the app, suggestions for improvement, or just want to connect, feel free to reach out. This project was created by two passionate students from the Faculty of Electrical Engineering, Mechanical Engineering and Naval Architecture (FESB) in Split, Croatia – myself and Toni Matutinović.
        </p>
        <p className="text-lg sm:text-xl text-gray-700">
          You can contact us directly via email at <a href="mailto:cimameruj@gmail.com" className="text-blue-600 hover:underline">cimameruj@gmail.com</a>. We’re eager to receive your feedback to enhance the app and support your fitness journey. Let’s build a stronger community together!
        </p>
        <p className="text-lg sm:text-xl text-gray-700">
          For the latest updates or to share your progress, stay in touch. We’re committed to making this tool as useful as possible for fitness enthusiasts like you.
        </p>
      </div>
    </main>
  );
}