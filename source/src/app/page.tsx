import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10 relative">
      {/* JT FITNESS tekst */}
      <h1 className="text-9xl font-extrabold tracking-tight absolute left-0 top-[30%] flex">
        <span className="text-[#F6AE87] mr-2">J</span>
        <span className="text-[#2A8EA7] mr-6">T</span>
        <span className="text-black">FITNESS</span>
      </h1>

      {/* Elipsa pozicionirana na desnu stranu, prelazi izvan glavnog sadržaja */}
      <div className="absolute top-1/8 right-0 transform translate-x-1/4 mt-[-200px]">
        <Image
          src="/Ellipse 1.png"
          alt="Ellipse"
          width={900}
          height={600}
          className="rounded-full"
        />
      </div>
    </main>
  );
}
