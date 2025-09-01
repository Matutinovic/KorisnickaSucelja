import Header from "@/components/Header";
import Description from "@/components/Description";
import ButtonGroup from "@/components/ButtonGroup";
import BulletPoints from "@/components/BulletPoints";
import BulletPoints2 from "@/components/BulletPoints2";
import Image from "next/image";
import Footer from "@/components/Footer";

const Page = () => (
  <div>
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-start h-full">
        <Header />
        <Description />
        <ButtonGroup />
      </div>
      {/* <div className="absolute top-1/8 right-0 transform translate-x-1/4 mt-[-200px] hidden sm:flex">
        <Image
          src="/Ellipse 1.png"
          alt="Ellipse"
          width={900}
          height={600}
          className="rounded-full"
        />
      </div> */}

      <div className="absolute top-[20%] right-8 hidden lg:block">
        <div className="absolute top-[18%] right-14 flex flex-col items-center space-y-4 z-0">
          {/* Slika Bencher na vrhu */}
          <Image
            src="/bencher.png"
            alt="Bencher"
            width={350}
            height={350}
            className="rounded-lg max-w-[200px] sm:max-w-[300px] md:max-w-[400px] opacity-30"
          />

          {/* Slike Vaga i Rast u istom redu, jedan do drugog */}
          <div className="flex space-x-4 hidden sm:flex">
            <div className="transform -translate-y-20">
              <Image
                src="/vaga.png"
                alt="Vaga"
                width={250}
                height={250}
                className="rounded-lg opacity-30"
              />
            </div>
            <div className="transform -translate-y-20">
              <Image
                src="/rast.png"
                alt="Rast"
                width={250}
                height={250}
                className="rounded-lg opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Novi */}
    <div className="flex flex-col sm:flex-row justify-between items-center mt-20 px-5 sm:px-10">
      {/* Slike */}
      <div className="flex-shrink-0 mb-6 sm:mb-0 sm:mr-10">
        <Image
          src="/benc.png"
          alt="Benc"
          width={400}
          height={300}
          className="rounded-lg"
        />
      </div>

      {/* Natuknice s desne strane */}
      <BulletPoints />
    </div>

    <div className="h-[100px]"></div>
    <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-20 px-5 sm:px-10">
      {/* BulletPoints2 */}
      <BulletPoints2 />

      {/* Slika */}
      <div className="flex-shrink-0 sm:mr-10 z-10 mt-6 sm:mt-0">
        <Image
          src="/dijagram.png"
          alt="Benc"
          width={400}
          height={300}
          className="rounded-lg"
        />
      </div>
    </div>

    <Footer />
  </div>
);

export default Page;
