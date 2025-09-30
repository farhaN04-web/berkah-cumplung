export const Footer = () => {
  return (
    <footer className="bottom-0 bg-amber-600 py-6 pt-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex-1 space-y-4">
            <img
              src="/images/logo.png"
              alt="Logo Berkah Cumplung"
              className="h-20 w-auto"
            />
            <p className="text-sm md:text-base">
              Pusat kerajinan kayu handmade dengan <br /> desain yang unik dan
              berkualitas tinggi.
            </p>
          </div>

          <div className="flex items-center space-x-5">
            <img 
              src="/images/logo ubsi.png" 
              alt="Logo UBSI" 
              className="h-32 w-auto"
            />
            <img 
              src="images/unggul.png" 
              alt="Logo UBSI UNGGUL" 
              className="h-32 w-auto"
              />
            <img 
              src="images/bipemas.png" 
              alt="Logo Bipemas" 
              className="h-32 w-auto"
              />
          </div>

          <div className="flex-1">
            <h3 className="my-8 text-lg font-semibold md:text-xl">Kontak</h3>
            <p className="mb-2 text-sm md:text-base">
              Desa Purbalingga Wetan Rt 01/Rw 01,
              <br />
              Purbalingga Wetan, Purbalingga, Jawa Tengah,<br />
              Indonesia
            </p>
            <div className="flex gap-2">
              <a
                href="https://wa.me/6285741436764"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[36px] w-[36px]"
              >
                <img src="/images/whatsapp.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white pt-8 text-center text-sm md:text-base">
          © 2025 Berkah Cumplung. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
