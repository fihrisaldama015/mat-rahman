import Link from "next/link";

const list_bab = [
  "Operasi Hitung Aljabar",
  "Perklian Dua Suku",
  "Faktorisasi Persamaan Kuadrat 1",
  "Faktorisasi Persamaan Kuadrat 2",
  "Faktorisasi Persamaan Kuadrat 3",
  "Faktorisasi Persamaan Kuadrat 4",
];

const tujuan = [
  "operasi_hitung",
  "perkalian_dua_suku",
  "faktorisasi_persamaan_kuadrat_1",
  "faktorisasi_persamaan_kuadrat_2",
  "faktorisasi_persamaan_kuadrat_3",
  "faktorisasi_persamaan_kuadrat_4",
];

const SimulasiSelanjutnya = ({ babSekarang }) => {
  return (
    <div className="absolute right-8 top-4 items-center h-full">
      <div className="flex flex-col items-end py-3 px-6 bg-slate-50 rounded-xl shadow-xl ring-1 ring-slate-300">
        <p className="text-sm text-slate-700">Simulasi Selanjutnya</p>
        <Link
          href={`/simulasi/${tujuan[babSekarang]}`}
          className="font-bold text-blue-500 hover:text-blue-600 cursor-pointer z-10 transition-all"
        >
          {list_bab[babSekarang]} &rarr;
        </Link>
      </div>
    </div>
  );
};

const SimulasiSebelumnya = ({ babSekarang }) => {
  return (
    <div className="absolute left-8 top-4 items-center h-full">
      <div className="flex flex-col items-start py-3 px-6 bg-slate-50 rounded-xl shadow-xl ring-1 ring-slate-300">
        <p className="text-sm text-slate-700">Simulasi Sebelumnya</p>
        <Link
          href={`/simulasi/${tujuan[babSekarang - 2]}`}
          className="font-bold text-blue-500 hover:text-blue-600 cursor-pointer z-10 transition-all"
        >
          &larr; {list_bab[babSekarang - 2]}
        </Link>
      </div>
    </div>
  );
};

export { SimulasiSebelumnya, SimulasiSelanjutnya };
