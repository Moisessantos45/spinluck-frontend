import { reactive } from "vue";
import { defineStore } from "pinia";
import { useApiResult } from "@/composables/useApiResult";
import {
  initialRaffle,
  type Raffle,
  type RaffleInfoGeneric,
} from "@/entities/raffle";
import { apiAuth } from "@/services/api";
import {
  mapperRaffle,
  mapperRaffleGeneric,
  raffleToJson,
} from "@/helpers/mappers/raffle";
import { mapperStateGeneric } from "@/helpers/mappers/state";
import type { StatusGeneric } from "@/entities/state";

const useRaffleStore = defineStore("raffle", () => {
  const { exec, loading, alertMessage } = useApiResult();
  const stateRaffle = reactive<StatusGeneric[]>([]);
  const rafflesGenerics = reactive<RaffleInfoGeneric[]>([]);
  const rafflesGenericsRecent = reactive<RaffleInfoGeneric[]>([]);
  const dataForm = reactive<Raffle>({ ...initialRaffle });
  let rafflesRecentRequest: Promise<void> | null = null;
  let rafflesRequest: Promise<void> | null = null;
  let lastRecentFetch = 0;
  let lastRafflesFetch = 0;
  const MIN_FETCH_INTERVAL_MS = 1000;

  const clearDataForm = () => {
    Object.assign(dataForm, initialRaffle);
  };

  const getStateRaffles = async () => {
    await exec(() => apiAuth.get("/raffle/status"), {
      mapper(res) {
        const extractedData = res.data.data ?? [];
        return extractedData.map(mapperStateGeneric);
      },
      onSuccess: (data) => {
        stateRaffle.splice(0, stateRaffle.length, ...data);
      },
      onError: (_) => {},
    });
  };

  const getRafflesGenericsRecent = async () => {
    if (Date.now() - lastRecentFetch < MIN_FETCH_INTERVAL_MS) return;
    if (rafflesRecentRequest) return rafflesRecentRequest;
    lastRecentFetch = Date.now();

    rafflesRecentRequest = (async () => {
      await exec(() => apiAuth.get("/raffle/organizer/recent"), {
        mapper(res) {
          const extractedData = res.data.data ?? [];
          return extractedData.map(mapperRaffleGeneric);
        },
        onSuccess: (data) => {
          rafflesGenericsRecent.splice(
            0,
            rafflesGenericsRecent.length,
            ...data,
          );
        },
        onError: (_) => {},
      });
    })();

    try {
      await rafflesRecentRequest;
    } finally {
      rafflesRecentRequest = null;
    }
  };

  const getRafflesGenerics = async () => {
    if (Date.now() - lastRafflesFetch < MIN_FETCH_INTERVAL_MS) return;
    if (rafflesRequest) return rafflesRequest;
    lastRafflesFetch = Date.now();

    rafflesRequest = (async () => {
      await exec(() => apiAuth.get("/raffle/organizer"), {
        mapper(res) {
          const extractedData = res.data.data ?? [];
          return extractedData.map(mapperRaffleGeneric);
        },
        onSuccess: (data) => {
          rafflesGenerics.splice(0, rafflesGenerics.length, ...data);
        },
        onError: (_) => {},
      });
    })();

    try {
      await rafflesRequest;
    } finally {
      rafflesRequest = null;
    }
  };

  const getRaffle = async (id: number) => {
    return await exec(() => apiAuth.get(`/raffle/${id}`), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error("Error al obtener el sorteo.");
        }
        return mapperRaffle(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(dataForm, { ...initialRaffle, ...data });
      },
      onError: (_) => {},
    });
  };

  const getRaffleBySlug = async (slug: string) => {
    return await exec(() => apiAuth.get(`raffle/slug/${slug}`), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error("Error al obtener el sorteo.");
        }
        return mapperRaffle(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(dataForm, { ...initialRaffle, ...data });
      },
      onError: (_) => {},
    });
  };

  const addRaffle = async () => {
    return await exec(() => apiAuth.post("/raffle", raffleToJson(dataForm)), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error("Error al agregar el sorteo.");
        }
        return mapperRaffle(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(dataForm, { ...initialRaffle, ...data });
      },
      onError: (_) => {},
    });
  };

  const updateRaffle = async () => {
    return await exec(
      () => apiAuth.put(`/raffle/${dataForm.id}`, raffleToJson(dataForm)),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error("Error al actualizar el sorteo.");
          }
          return mapperRaffle(extractedData);
        },
        onSuccess: (data) => {
          Object.assign(dataForm, { ...initialRaffle, ...data });
        },
        onError: (_) => {},
      },
    );
  };

  return {
    loading,
    alertMessage,
    rafflesGenerics,
    rafflesGenericsRecent,
    dataForm,
    stateRaffle,
    clearDataForm,
    getStateRaffles,
    getRafflesGenerics,
    getRafflesGenericsRecent,
    getRaffle,
    getRaffleBySlug,
    addRaffle,
    updateRaffle,
  };
});

export default useRaffleStore;
