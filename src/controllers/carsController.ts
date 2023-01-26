import httpStatus from "http-status";

import { Request, Response } from "express";
import carService from "../services/carService.js";
import { Cars, UpdatedCars } from "../protocols/types.js";

async function getAllCars(req: Request, res: Response) {
  try {
    const cars = (await carService.getCars()) as Cars[];
    res.send(cars);
  } catch (e) {
    e;
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function getSpecificCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);
  try {
    const car = (await carService.getCar(carId)) as Cars;
    res.send(car);
  } catch (e) {
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

async function createCar(req: Request, res: Response) {
  const newCar = req.body as Cars;

  try {
    await carService.createCar(newCar);
    res.sendStatus(httpStatus.CREATED);
  } catch (e) {
    e;
    if (e.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);

  try {
    await carService.deleteCar(carId);
    res.send(httpStatus.OK);
  } catch (e) {
    console.log(e);
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);
  const updatedCar = req.body as UpdatedCars;

  try {
    await carService.updateCar(carId, updatedCar);
    res.send(httpStatus.OK);
  } catch (e) {
    console.log(e);
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const carController = {
  getAllCars,
  getSpecificCar,
  createCar,
  deleteCar,
  updateCar,
};

export default carController;
