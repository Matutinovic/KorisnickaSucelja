import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <div className="flex flex-col min-h-screen">
    {/* Glavni sadržaj stranice */}
    <main className="flex-grow">{/* Tvoj glavni sadržaj */}</main>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-8 sm:py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        {/* Tekst u footeru */}
        <p className="text-center text-lg sm:text-xl font-semibold mb-4">
          If you don’t find the time, if you don’t do the work, you don’t get
          the results!
        </p>

        {/* Ikona emaila */}
        <div className="flex justify-center">
          <Link href="mailto:cimameruj@gmail.com">
            <FaEnvelope className="text-2xl sm:text-3xl hover:text-yellow-500 transition duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
