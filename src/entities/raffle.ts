interface Raffle {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  date: string;
  quantityTickets: number;
  maxWinners: number;
  slug: string;
  organizerId: number;
  riffleStatusId: number;
  createdAt: Date;
  updatedAt: Date;

  ticketsAvailable: number;
}

interface RaffleInfoGeneric {
  id: number;
  title: string;
  slug: string;
  quantityTickets: number;
  status: string;
  imageUrl: string;
  progress: number;
  totalSold: number;
  totalAmount: number;
}

const initialRaffle: Raffle = {
  id: -1,
  title: "",
  description: "",
  price: 0,
  imageUrl: "",
  date: new Date().toISOString(),
  quantityTickets: 0,
  maxWinners: 1,
  slug: "",
  organizerId: -1,
  riffleStatusId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  ticketsAvailable: 0,
};

export { type Raffle, type RaffleInfoGeneric, initialRaffle };
