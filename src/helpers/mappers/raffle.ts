import type { Raffle, RaffleInfoGeneric } from "@/entities/raffle";
import { getDateToString, getNumber, getString } from "./formatters";

const mapperRaffle = (data: Record<string, unknown>): Raffle => {
  return {
    id: getNumber(data.id),
    title: getString(data.title),
    description: getString(data.description),
    price: getNumber(data.price),
    imageUrl: getString(data.image_url),
    date: getDateToString(data.date),
    quantityTickets: getNumber(data.quantity_tickets),
    maxWinners: getNumber(data.max_winners, 1),
    slug: getString(data.slug),
    organizerId: getNumber(data.organizer_id),
    riffleStatusId: getNumber(data.raffle_status_id),
    createdAt: new Date(getString(data.created_at, new Date().toISOString())),
    updatedAt: new Date(getString(data.updated_at, new Date().toISOString())),

    ticketsAvailable: getNumber(data.tickets_available),
  };
};

const mapperRaffleGeneric = (
  data: Record<string, unknown>,
): RaffleInfoGeneric => {
  return {
    id: getNumber(data.id),
    title: getString(data.title),
    slug: getString(data.slug),
    quantityTickets: getNumber(data.quantity_tickets),
    status: getString(data.status),
    imageUrl: getString(data.image_url),
    progress: getNumber(data.progress),
    totalSold: getNumber(data.total_sold),
    totalAmount: getNumber(data.total_amount),
  };
};

const raffleToJson = (raffle: Partial<Raffle>) => ({
  title: raffle.title,
  description: raffle.description,
  price: Number(raffle.price),
  image_url: raffle.imageUrl,
  date: raffle.date,
  quantity_tickets: Number(raffle.quantityTickets),
  max_winners: Number(raffle.maxWinners),
  raffle_status_id: Number(raffle.riffleStatusId),
});

export { mapperRaffle, mapperRaffleGeneric, raffleToJson };
