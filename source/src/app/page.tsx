import Header from "@/components/Header";
import Description from "@/components/Description";
import ButtonGroup from "@/components/ButtonGroup";
import BulletPoints from "@/components/BulletPoints";
import BulletPoints2 from "@/components/BulletPoints2";
import Image from "next/image";
import Footer from "@/components/Footer";

const Page = () => (
  <div>
    <Header />
    <Description />
    <ButtonGroup />
    <div className="absolute top-1/8 right-0 transform translate-x-1/4 mt-[-200px] hidden sm:flex">
      <Image
        src="/Ellipse 1.png"
        alt="Ellipse"
        width={900}
        height={600}
        className="rounded-full"
      />
    </div>

    <div className="absolute top-[18%] right-14 flex flex-col items-center space-y-4 z-10">
  {/* Slika Bencher na vrhu */}
  <Image
    src="/bencher.png"
    alt="Bencher"
    width={400}
    height={400}
    className="rounded-lg max-w-[200px] sm:max-w-[300px] md:max-w-[400px]"
  />

  {/* Slike Vaga i Rast u istom redu, jedan do drugog */}
  <div className="flex space-x-4 hidden sm:flex">
    <div className="transform -translate-y-20">
      <Image
        src="/vaga.png"
        alt="Vaga"
        width={300}
        height={300}
        className="rounded-lg"
      />
    </div>
    <div className="transform -translate-y-20">
      <Image
        src="/rast.png"
        alt="Rast"
        width={200}
        height={200}
        className="rounded-lg"
      />
    </div>
  </div>
</div>

    <div className="h-[800px]"></div>

    {/* Novi */}
    <div className="flex justify-between items-center mt-20 px-10">
      {/* Slike */}
      <div className="flex-shrink-0 mr-10">
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
    <div className="flex justify-between items-center mt-20 px-10">
      <BulletPoints2 />

      <div className="flex-shrink-0 mr-10 z-10">
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
