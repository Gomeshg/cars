import prisma from "../config/prisma.js";
import { Cars, UpdatedCars } from "../protocols/types.js";

async function getCars(): Promise<Cars[]> {
  return prisma.cars.findMany();
}

async function getCar(id: number): Promise<Cars> {
  return prisma.cars.findUnique({
    where: {
      id: id,
    },
  });
}

async function getCarWithLicensePlate(licensePlate: string): Promise<Cars> {
  return prisma.cars.findUnique({
    where: {
      licensePlate: licensePlate,
    },
  });
}

async function createCar(cars: Cars): Promise<Cars> {
  return prisma.cars.create({
    data: cars,
  });
}

async function deleteCar(id: number): Promise<Cars> {
  return prisma.cars.delete({
    where: {
      id,
    },
  });
}

async function updateCar(id: number, updatedCars: UpdatedCars): Promise<Cars> {
  return prisma.cars.update({
    where: {
      id,
    },
    data: updatedCars,
  });
}

const carRepository = {
  getCars,
  getCar,
  getCarWithLicensePlate,
  createCar,
  deleteCar,
  updateCar,
};

export default carRepository;
