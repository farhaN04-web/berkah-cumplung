import { valueData } from "@/data/valueData";
import { ValueCard } from "@/components/user/ValueCard";

const AboutUsPage = () => {
  const valueList = valueData.map((value, index) => {
    return (
      <ValueCard
        key={index}
        icon={value.icon}
        title={value.title}
        description={value.description}
      />
    );
  });

  return (
    <main className="font-Poppins relative bg-white">
      {/* Hero Section Start */}
      <section className="relative flex h-[90vh] items-center justify-center px-4 text-center md:h-[70vh]">
        {/* Background Hero Section */}
        <div className="absolute inset-0 bg-[url('/images/header.png')] bg-cover bg-center bg-no-repeat"></div>

        <div className="relative z-10 text-white">
          <h1 className="mb-6 text-[36px] font-bold md:text-5xl lg:text-[56px]">
            Tentang Berkah Cumplung
          </h1>
          <p className="mb-8 text-lg md:text-xl lg:text-2xl">
            Pusat kerajinan kayu handmade dengan desain yang unik dan
            berkualitas <br className="hidden sm:block" /> tinggi sejak 2021.
          </p>
        </div>
      </section>
      {/* Hero Section End */}

      {/* Story Section Start */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold text-amber-800 md:text-[32px]">
            Cerita Kami
          </h2>
          <p className="mx-auto max-w-7xl text-lg text-black md:text-2xl">
            Tidak hanya kayu dan batok kelapa yang memiliki nilai guna, tetapi juga 
            <br className="hidden sm:block" /> dapat menjadi karya seni yang menghadirkan kebahagiaan bagi siapa pun yang melihatnya.
            <br className="hidden sm:block" /> Hal inilah yang kami tampilkan pada setiap desain, dengan memadukan ornamen alami kayu dan batok kelapa serta pilihan finishing yang menarik.
          </p>
          <p className="mx-auto my-6 max-w-7xl text-lg text-black md:text-2xl">
            Kreativitas seorang pengrajin yang berawal dari hobi sederhana, hingga pada <br className="hidden sm:block" /> pada tahun 2021 menghasilkan karya yang mampu menarik minat banyak orang, 
            <br className="hidden sm:block" /> baik anak-anak hingga orang dewasa, berupa produk kerajinan unik dengan nilai seni yang tinggi.
          </p>
          <p className="mx-auto max-w-7xl text-lg text-black md:text-2xl">
            Produk kami memiliki desain ukiran dan kerajinan kayu maupun batok kelapa yang beragam<br className="hidden sm:block" /> dan khas, dengan selalu mengutamakan kualitas serta estetika di setiap detailnya.
            <br className="hidden sm:block" /> Dengan begitu, setiap pembeli akan merasa bangga saat memiliki dan menggunakannya.
          </p>
        </div>
      </section>
      {/* Story Section End */}

      {/* Value Section Start */}
      <section className="bg-amber-50 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold text-amber-800 md:text-[32px]">
            Nilai-Nilai Kami
          </h2>
          <div className="flex flex-wrap justify-center gap-8">{valueList}</div>
        </div>
      </section>
      {/* Value Section End */}

      {/* Training Section Start */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="mb-8 text-2xl font-bold text-amber-800 md:text-[32px]">
              Pelatihan
            </h1>
            <p className="mx-auto max-w-5xl text-lg text-black md:text-2xl">
              Kami juga memberikan pelatihan membuat peralatan dapur dan makan. Hubungi kami untuk informasi lebih lanjut tentang
              jadwal dan biaya pelatihan.
            </p>
          </div>
        </div>
      </section>
      {/* Training Section End */}
    </main>
  );
};

export default AboutUsPage;
