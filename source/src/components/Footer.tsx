import { FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";

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

        {/* Ikone društvenih mreža */}
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl sm:text-3xl hover:text-green-500 transition duration-300" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-2xl sm:text-3xl hover:text-blue-500 transition duration-300" />
          </a>
          <a href="mailto:example@email.com">
            <FaEnvelope className="text-2xl sm:text-3xl hover:text-yellow-500 transition duration-300" />
          </a>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
