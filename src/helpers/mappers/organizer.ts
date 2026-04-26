import type {
  Organizer,
  OrganizerDashboardMetrics,
} from "@/entities/organizer";
import { getDateToString, getNumber, getString } from "./formatters";

const mapperOrganizer = (data: Record<string, unknown>): Organizer => {
  return {
    id: getNumber(data.id),
    name: getString(data.name),
    phone: getString(data.phone),
    created_at: getDateToString(data.created_at),
    updated_at: getDateToString(data.updated_at),
  };
};

const mapperOrganizerDashboardMetrics = (
  data: Record<string, unknown>,
): OrganizerDashboardMetrics => {
  return {
    totalAmount: getNumber(data.total_amount),
    averageTicketPrice: getNumber(data.average_ticket_price),
    totalParticipants: getNumber(data.total_participants),
    totalRaffles: getNumber(data.total_raffles),
    totalUniqueParticipants: getNumber(data.total_unique_participants),
    effectiveSalesRate: getNumber(data.effective_sales_rate),
    activeRafflesExpiringSoon: getNumber(data.active_raffles_expiring_soon),
    estimatedDepletionDays: getNumber(data.estimated_depletion_days),
    stagnantTickets: getNumber(data.stagnant_tickets),
    activeRafflesWithoutPrizes: getNumber(data.active_raffles_without_prizes),
  };
};

const organizerToJson = (organizer: Partial<Organizer>) => ({
  name: organizer.name,
  phone: organizer.phone,
});

export { mapperOrganizer, mapperOrganizerDashboardMetrics, organizerToJson };
