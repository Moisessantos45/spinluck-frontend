import { reactive } from "vue";
import { defineStore } from "pinia";
import { useApiResult } from "@/composables/useApiResult";
import {
  initialTicket,
  initialTicketWithOrganizerNumber,
  type Ticket,
  type TicketPublicData,
  type TicketWithOrganizerNumber,
} from "@/entities/ticket";
import { apiAuth } from "@/services/api";
import {
  mapperTicket,
  mapperTicketPublicData,
  mapperTicketWithOrganizerNumber,
  ticketToJson,
} from "@/helpers/mappers/ticket";
import { initialStatusGeneric, type StatusGeneric } from "@/entities/state";
import { mapperStateGeneric } from "@/helpers/mappers/state";

const useTicketStore = defineStore("ticket", () => {
  const { exec, loading, alertMessage } = useApiResult();
  const ticketFormState = reactive<Ticket>({ ...initialTicket });
  const ticketStatus = reactive<StatusGeneric[]>([]);
  const tickets = reactive<Ticket[]>([]);
  const ticketsPublicData = reactive<TicketPublicData[]>([]);
  const ticketWithOrganizerNumber = reactive<TicketWithOrganizerNumber>({
    ...initialTicketWithOrganizerNumber,
  });

  const setDataForm = (ticket: Ticket) => {
    Object.assign(ticketFormState, ticket);
  };

  const clearDataForm = () => {
    Object.assign(ticketFormState, initialTicket);
  };

  let stateTicketsRequest: Promise<void> | null = null;
  const getStateTickets = async () => {
    if (stateTicketsRequest) return stateTicketsRequest;
    stateTicketsRequest = (async () => {
      await exec(() => apiAuth.get("/ticket/status"), {
        mapper(res) {
          const extractedData = res.data.data ?? [];
          return extractedData.map(mapperStateGeneric);
        },
        onSuccess: (data) => {
          ticketStatus.splice(0, ticketStatus.length, ...data);
        },
        onError: (_) => {},
      });
    })();
    try {
      await stateTicketsRequest;
    } finally {
      stateTicketsRequest = null;
    }
  };

  const getTickets = async (raffleId: number) => {
    await exec(() => apiAuth.get(`/ticket/raffle/${raffleId}`), {
      mapper(res) {
        const extractedData = res.data.data ?? [];
        if (!Array.isArray(extractedData)) {
          throw new Error("Error al obtener los tickets.");
        }
        return extractedData.map(mapperTicket);
      },
      onSuccess: (data) => {
        tickets.splice(0, tickets.length, ...data);
      },
      onError: (_) => {},
    });
  };

  const getTicketsPublicData = async (raffleId: number) => {
    await exec(() => apiAuth.get(`/ticket/raffle/${raffleId}/public`), {
      mapper(res) {
        const extractedData = res.data.data ?? [];
        if (!Array.isArray(extractedData)) {
          throw new Error(
            "Error al obtener los datos públicos de los tickets.",
          );
        }
        return extractedData.map(mapperTicketPublicData);
      },
      onSuccess: (data) => {
        ticketsPublicData.splice(0, ticketsPublicData.length, ...data);
      },
      onError: (_) => {},
    });
  };

  const getRandomSoldTicket = async (raffleId: number) => {
    await exec(() => apiAuth.get(`/ticket/raffle/${raffleId}/sold`), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error("Error al obtener el ticket vendido aleatorio.");
        }
        return mapperTicket(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(ticketFormState, {
          ...data,
          ticketStatus: data.ticketStatus ?? { ...initialStatusGeneric },
        });
      },
      onError: (_) => {},
    });
  };

  const getRandomAvailableTicket = async (raffleId: number) => {
    return await exec(
      () => apiAuth.get(`/ticket/raffle/${raffleId}/available`),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error("Error al obtener el ticket disponible aleatorio.");
          }

          return mapperTicketWithOrganizerNumber(extractedData);
        },
        onSuccess: (data) => {
          Object.assign(ticketWithOrganizerNumber, data);
        },
        onError: (_) => {},
      },
    );
  };

  const getGeneratedVoucher = async (id: number) => {
    return await exec(
      () =>
        apiAuth.get(`/ticket/voucher/${id}`, {
          responseType: "blob",
        }),
      {
        mapper(res) {
          const blob = res.data;
          if (!blob) {
            throw new Error("Error al obtener el voucher generado.");
          }

          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        },
        onError: (_) => {},
      },
    );
  };

  const getTicket = async (id: number) => {
    await exec(() => apiAuth.get(`/ticket/${id}`), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error("Error al obtener el ticket.");
        }
        return mapperTicket(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(ticketFormState, {
          ...data,
          ticketStatus: data.ticketStatus ?? { ...initialStatusGeneric },
        });
      },
      onError: (_) => {},
    });
  };

  const searchTicketByNumber = async (raffleId: number, number: string) => {
    return await exec(
      () =>
        apiAuth.get(`/ticket/raffle/${raffleId}/search`, {
          params: { number },
        }),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error("Error al buscar el ticket por número.");
          }
          return mapperTicketWithOrganizerNumber(extractedData);
        },
        onSuccess: (data) => {
          Object.assign(ticketWithOrganizerNumber, {
            ...data,
          });
        },
        onError: (_) => {},
      },
    );
  };

  const addTicket = async () => {
    return await exec(
      () => apiAuth.post("/ticket", ticketToJson(ticketFormState)),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error("Error al agregar el ticket.");
          }
          return mapperTicket(extractedData);
        },
        onSuccess: (data) => {
          Object.assign(ticketFormState, data);
        },
        onError: (_) => {},
      },
    );
  };

  const updateTicket = async () => {
    const dataToUpdate = ticketToJson(ticketFormState);
    return await exec(
      () => apiAuth.put(`/ticket/${ticketFormState.id}`, dataToUpdate),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error("Error al actualizar el ticket.");
          }
          return mapperTicket(extractedData);
        },
        onSuccess: (data) => {
          Object.assign(ticketFormState, {
            ...data,
            ticketStatus: data.ticketStatus ?? { ...initialStatusGeneric },
          });
        },
        onError: (_) => {},
      },
    );
  };

  const updateTicketToWinner = async (id: number, raffleId: number) => {
    return await exec(
      () =>
        apiAuth.patch(`/ticket/raffles/${raffleId}/tickets/${id}/winner`, {
          ticketId: ticketFormState.id,
        }),
      {
        mapper(res) {
          const extractedData = res.data.message ?? null;
          if (!extractedData) {
            throw new Error("Error al actualizar el ticket a ganador.");
          }
          return extractedData;
        },
        onSuccess: (_) => {
          tickets.map((ticket) =>
            ticket.id === id ? { ...ticket, winner: true } : ticket,
          );
        },
        onError: (_) => {},
      },
    );
  };

  return {
    loading,
    ticketFormState,
    ticketStatus,
    ticketsPublicData,
    tickets,
    ticketWithOrganizerNumber,
    setDataForm,
    clearDataForm,
    getStateTickets,
    getRandomSoldTicket,
    getRandomAvailableTicket,
    getGeneratedVoucher,
    getTickets,
    getTicketsPublicData,
    getTicket,
    searchTicketByNumber,
    addTicket,
    updateTicket,
    updateTicketToWinner,
    alertMessage,
  };
});

export default useTicketStore;
