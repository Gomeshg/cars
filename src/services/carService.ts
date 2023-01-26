import notFoundError from "../errors/notFoundError.js";
import conflictError from "../errors/conflictError.js";
import carRepository from "../repository/carRepository.js";
import { Cars, UpdatedCars } from "../protocols/types.js";

async function getCars() {
  const cars = (await carRepository.getCars()) as Cars[];
  return cars;
}

async function getCar(id: number) {
  const car = (await carRepository.getCar(id)) as Cars;
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function createCar(cars: Cars) {
  const car = (await carRepository.getCarWithLicensePlate(
    cars.licensePlate
  )) as Cars;
  if (car) {
    throw conflictError(
      `Car with license plate ${cars.licensePlate} already registered.`
    );
  }

  await carRepository.createCar(cars);
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
}

async function updateCar(carId: number, updatedCar: UpdatedCars) {
  await getCar(carId);

  if (updatedCar.licensePlate) {
    const licensePlateAlreadyExists =
      await carRepository.getCarWithLicensePlate(updatedCar.licensePlate);
    if (licensePlateAlreadyExists) {
      throw conflictError(
        `Car with license plate ${updatedCar.licensePlate} already registered.`
      );
    }
  }

  await carRepository.updateCar(carId, updatedCar);
}

const carService = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
};

export default carService;
