interface Organizer {
  id: number;
  name: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

interface OrganizerDashboardMetrics {
  totalAmount: number;
  averageTicketPrice: number;
  totalParticipants: number;
  totalRaffles: number;
  totalUniqueParticipants: number;
  effectiveSalesRate: number;
  activeRafflesExpiringSoon: number;
  estimatedDepletionDays: number;
  stagnantTickets: number;
  activeRafflesWithoutPrizes: number;
}

const initialOrganizer: Organizer = {
  id: -1,
  name: "",
  phone: "",
  created_at: "",
  updated_at: "",
};

const initialOrganizerDashboardMetrics: OrganizerDashboardMetrics = {
  totalAmount: 0,
  averageTicketPrice: 0,
  totalParticipants: 0,
  totalRaffles: 0,
  totalUniqueParticipants: 0,
  effectiveSalesRate: 0,
  activeRafflesExpiringSoon: 0,
  estimatedDepletionDays: 0,
  stagnantTickets: 0,
  activeRafflesWithoutPrizes: 0,
};

export {
  type Organizer,
  type OrganizerDashboardMetrics,
  initialOrganizer,
  initialOrganizerDashboardMetrics,
};
