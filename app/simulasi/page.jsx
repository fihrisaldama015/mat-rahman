import React from "react";
import Card from "./Card";

const SimulasiPage = () => {
  return (
    <div>
      <div className="w-full h-72 bg-[url('/bg_dashboard.jpg')]">
        <div className="flex h-full items-center justify-center flex-col gap-4 bg-black/50">
          <img
            src={"/icon_simulasi.png"}
            width={128}
            alt=""
            className="rounded-full invert"
          />
          <div className="text-white">
            <h1 className="text-5xl font-semibold drop-shadow-xl">Simulasi</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-16 flex-wrap p-16">
        <Card
          id="operasi_hitung"
          variant={"blue"}
          title="Operasi Hitung Aljabar"
          img={"/simulasi1.png"}
          penjelasan="Menentukan hasil operasi penjumlahan dan pengurangan aljabar dengan menggunakan blok aljabar"
        />
        {/* menentukan hasil operasi aljabar dengan menggunakan blok aljabar */}
        <Card
          id="perkalian_dua_suku"
          variant={"purple"}
          title="Perkalian Dua Suku"
          img={"/simulasi1.png"}
          penjelasan="Menentukan hasil perkalian suku dua dan suku dua menggunakan blok Aljabar"
        />
        {/* menentukan hasil perkalian suku dua dan suku dua */}
        <Card
          variant={"green"}
          title="Faktorisasi Persamaan Kuadrat"
          img={"/simulasi1.png"}
          penjelasan={`Persamaan Kuadrat :`}
          rumus={"Ax^2 + Bx + C$ dengan syarat $A = 1$, $B & C$ positif"}
          id="faktorisasi_persamaan_kuadrat_1"
        />
        {/* a=1, b & c positif */}
        <Card
          variant={"red"}
          title="Faktorisasi Persamaan Kuadrat"
          img={"/simulasi1.png"}
          penjelasan={`Persamaan Kuadrat :`}
          rumus={
            "Ax^2 + Bx + C$ dengan syarat $A = 1$, $B & C$ positif atau negatif"
          }
          id="faktorisasi_persamaan_kuadrat_2"
        />
        {/* a=1, b & c positif/negatif */}
        <Card
          variant={"yellow"}
          title="Faktorisasi Persamaan Kuadrat"
          img={"/simulasi1.png"}
          penjelasan={`Persamaan Kuadrat :`}
          rumus={"Ax^2 + Bx + C$ dengan syarat $A > 1$, $B & C$ positif"}
          id="faktorisasi_persamaan_kuadrat_3"
        />
        {/* a>1, b & c positif */}
        <Card
          variant={"cyan"}
          title="Faktorisasi Persamaan Kuadrat"
          img={"/simulasi1.png"}
          penjelasan={`Persamaan Kuadrat :`}
          rumus={
            "Ax^2 + Bx + C$ dengan syarat $A > 1$, $B & C$ positif atau negatif"
          }
          id="faktorisasi_persamaan_kuadrat_4"
        />
        {/* a>1, b & c positif/negatif */}
      </div>
    </div>
  );
};

export default SimulasiPage;
