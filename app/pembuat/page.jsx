import Image from "next/image";

const Pembuat = () => {
  return (
    <div className="min-h-[90svh] px-12 flex xl:flex-row flex-col justify-around items-center">
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <h1 className="text-6xl">
            Muhammad <span className="font-bold text-sky-600">Rahman </span>
            <br></br>
            Prihadi
          </h1>
        </div>
        <a
          href={"https://www.unesa.ac.id/"}
          target="_blank"
          className="py-3 px-6 rounded-lg flex items-center gap-8 bg-slate-900 hover:bg-slate-800 hover:scale-105 hover:shadow-xl w-fit shadow-lg transition-all"
        >
          <p className="text-base font-semibold tracking-wide text-white/90">
            University of Surabaya
          </p>
          <Image
            src="/unesa.png"
            alt="university"
            width={200}
            height={200}
            className="w-8 object-contain"
          />
        </a>
        <p className="text-slate-700 tracking-wide max-w-md">
          A Mathematics student with a passion for math, Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Distinctio, nemo. Nostrum,
          accusamus nisi dolorem quia veniam consequatur.
        </p>
      </div>
      <div>
        <div className="relative bg-gradient-to-b from-[#0e749066] to-[#37415100] rounded-tl-full rounded-tr-full translate-y-8">
          <div className="social absolute w-full sm:w-fit flex sm:flex-col flex-row gap-4 [&>a]:p-3 items-center justify-center sm:top-0 bottom-0 sm:bottom-0 sm:-left-[100px] left-0">
            <a href="https://www.instagram.com/muhamadfihris/" target="_blank">
              <img
                src="/img/pngkey.com-instagram-png-775860.png"
                className="opacity-50 hover:opacity-100"
                alt=""
                width="24"
              />
            </a>
            <a href="https://github.com/fihrisaldama015/" target="_blank">
              <img src="/img/github.png" alt="" width="24" />
            </a>
            <a href="https://www.linkedin.com/in/fihrisaldama/" target="_blank">
              <img src="/img/linkedin.png" alt="" width="24" />
            </a>
          </div>
          <Image
            src="/profil.jpg"
            alt="profile-pic"
            width={1000}
            height={1000}
            className="hero-picture m-8 w-[200px] -translate-y-16"
            style={{ filter: "drop-shadow(0 0 1rem rgba(0, 0, 0, 0.25))" }}
          />
        </div>
        <div className="relative flex flex-col justify-center items-center">
          <div className="red absolute -right-[100px] -top-[100px] bg-[#fca5a580] w-[150px] h-[150px] rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Pembuat;
