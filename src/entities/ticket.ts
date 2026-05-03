import { initialStatusGeneric, type StatusGeneric } from "./state";

interface Ticket {
  id: number;
  number: number;
  participantName: string;
  participantPhone: string;
  raffleId: number;
  ticketStatusId: number;
  winner: boolean;
  formattedNumber: string;
  slug?: string;
  createdAt: Date;
  updatedAt: Date;

  ticketStatus: StatusGeneric;
  organizerNumber: string;
}

interface TicketWithOrganizerNumber {
  id: number;
  number: number;
  formattedNumber: string;
  slug: string;
  organizerNumber: string;
}

const initialTicket: Ticket = {
  id: -1,
  number: -1,
  participantName: "",
  participantPhone: "",
  raffleId: -1,
  ticketStatusId: -1,
  winner: false,
  formattedNumber: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  ticketStatus: { ...initialStatusGeneric },
  organizerNumber: "-1",
};

const initialTicketWithOrganizerNumber: TicketWithOrganizerNumber = {
  id: -1,
  number: -1,
  formattedNumber: "",
  slug: "",
  organizerNumber: "-1",
};

export {
  type Ticket,
  type TicketWithOrganizerNumber,
  initialTicket,
  initialTicketWithOrganizerNumber,
};
