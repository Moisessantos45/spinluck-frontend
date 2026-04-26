import type { Ticket, TicketWithOrganizerNumber } from "@/entities/ticket";
import { getNumber, getString } from "./formatters";
import { mapperStateGeneric } from "./state";
import { initialStatusGeneric } from "@/entities/state";

const mapperTicket = (data: Record<string, unknown>): Ticket => {
  return {
    id: getNumber(data.id),
    number: getNumber(data.number),
    participantName: getString(data.participant_name),
    participantPhone: getString(data.participant_phone),
    raffleId: getNumber(data.raffle_id),
    ticketStatusId: getNumber(data.status_id ?? data.ticket_status_id),
    winner: data.winner?.toString().toLowerCase() === "true",
    createdAt: new Date(getString(data.created_at, new Date().toISOString())),
    updatedAt: new Date(getString(data.updated_at, new Date().toISOString())),

    ticketStatus:
      data["ticket_status"] && typeof data["ticket_status"] === "object"
        ? mapperStateGeneric(data["ticket_status"] as Record<string, unknown>)
        : { ...initialStatusGeneric },
    organizerNumber: getString(data.organizer_number, "-1"),
  };
};

const mapperTicketWithOrganizerNumber = (
  data: Record<string, unknown>,
): TicketWithOrganizerNumber => {
  return {
    id: getNumber(data.id),
    number: getNumber(data.number),
    slug: getString(data.slug),
    organizerNumber: getString(data.organizer_number, "-1"),
  };
};

const ticketToJson = (ticket: Partial<Ticket>) => ({
  number: ticket.number,
  participant_name: ticket.participantName,
  participant_phone: ticket.participantPhone,
  raffle_id: ticket.raffleId,
  ticket_status_id: ticket.ticketStatusId,
});

export { mapperTicket, mapperTicketWithOrganizerNumber, ticketToJson };
