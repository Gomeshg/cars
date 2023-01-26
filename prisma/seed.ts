import prisma from "../src/config/prisma";

export async function seed() {
  await prisma.cars.createMany({
    data: [
      {
        model: "Ferrari",
        licensePlate: "LAS5546",
        year: "2010",
        color: "Vermelha",
      },
      {
        model: "HB20",
        licensePlate: "LAS5545",
        year: "2010",
        color: "Vermelha",
      },
      {
        model: "Lamburguini",
        licensePlate: "LAS5543",
        year: "2010",
        color: "Vermelha",
      },
      {
        model: "Fusca",
        licensePlate: "LAS5541",
        year: "2010",
        color: "Vermelha",
      },
      {
        model: "Uno",
        licensePlate: "LAS5562",
        year: "2010",
        color: "Vermelha",
      },
    ],
  });
}

seed()
  .then(() => {
    console.log("Registro feito com sucesso!");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
