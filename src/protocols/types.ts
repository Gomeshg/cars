export type Cars = {
  id?: number;
  model: string;
  licensePlate: string;
  year: string;
  color: string;
  createAt?: Date;
};

export type UpdatedCars = {
  model?: string;
  licensePlate?: string;
  year?: string;
  color?: string;
};
