import { MapPin, Phone } from "lucide-react";
import { faqData } from "@/data/faqData";
import { FaqCard } from "@/components/user/FaqCard";

const ContactPage = () => {
  const faqList = faqData.map((faq, index) => {
    return <FaqCard key={index} answer={faq.answer} question={faq.question} />;
  });

  return (
    <main className="font-Poppins relative bg-white">
      {/* Hero Section Start */}
      <section className="relative flex h-[90vh] items-center justify-center px-4 text-center md:h-[70vh]">
        {/* Background Hero Section */}
        <div className="absolute inset-0 bg-[url('/images/header.png')] bg-cover bg-center bg-no-repeat"></div>

        <div className="relative z-10 text-white">
          <h1 className="mb-6 text-[36px] font-bold md:text-5xl lg:text-[56px]">
            Hubungi Kami
          </h1>
          <p className="mb-8 text-lg md:text-xl lg:text-2xl">
            Kami siap membantu Anda dengan pertanyaan, pesanan khusus, atau
            <br className="hidden sm:block" /> informasi lainnya.
          </p>
        </div>
      </section>
      {/* Hero Section End */}

      {/* Contact Section Start */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="flex flex-col justify-between gap-10 md:flex-row">
                <div className="flex-1">
                  <h1 className="mb-8 text-2xl font-bold text-amber-800 md:text-[32px]">
                    Informasi Kontak
                  </h1>

                  <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-full bg-amber-300 p-2">
                      <MapPin className="mt-1 h-8 w-8 text-amber-800" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black md:text-base">
                        Alamat
                      </p>
                      <p className="text-xs text-neutral_500 md:text-sm">
                        Desa Purbalingga Wetan Rt 01/Rw 01, <br />
                        Purbalingga Wetan, Purbalingga, Jawa Tengah, Indonesia
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-full bg-amber-300 p-2">
                      <Phone className="mt-1 h-8 w-8 text-amber-800" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-black md:text-base">
                        Telepon & WhatsApp
                      </p>
                      <p className="text-xs text-neutral_500 md:text-sm">
                        +62 857 4143 6764
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="mb-8 text-2xl font-bold text-amber-800 md:text-[32px]">
                    Jam Operasional
                  </h1>
                  <div className="space-y-1 text-sm font-medium text-black md:text-base">
                    <p>Senin - Jumat: 09:00 - 20:00</p>
                    <p>Sabtu: 09:00 - 17:00</p>
                    <p>Minggu: Tutup</p>
                  </div>
                </div>
              </div>

              <div className="pt-10 text-center">
                <h1 className="mb-8 text-2xl font-bold text-amber-800 md:text-[32px]">
                  Lokasi Kami
                </h1>
                <div className="h-[500px] w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.640833611293!2d109.3678377!3d-7.394081299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6559007a890e25%3A0xbdee8ea220b0158a!2sBerkah%20cumplung!5e0!3m2!1sid!2sid!4v1758637974247!5m2!1sid!2sid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section End */}

      {/* FAQ Section Start */}
      <section className="bg-amber-50 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold text-amber-800 md:text-[32px]">
            Pertanyaan Umum
          </h2>
          <div className="flex flex-wrap justify-center gap-6">{faqList}</div>
        </div>
      </section>
      {/* FAQ Section End */}
    </main>
  );
};

export default ContactPage;
