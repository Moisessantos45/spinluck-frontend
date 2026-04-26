interface Prize {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  organizerId: number;
  createdAt: Date;
  updatedAt: Date;

  raffleId?: number;
}


const initialPrize: Prize = {
  id: -1,
  title: "",
  description: "",
  imageUrl: "",
  organizerId: -1,
  createdAt: new Date(),
  updatedAt: new Date(),
  raffleId: -1,
};

export { type Prize, initialPrize };