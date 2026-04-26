import { reactive } from "vue";
import { defineStore } from "pinia";
import { useApiResult } from "@/composables/useApiResult";
import { initialPrize, type Prize } from "@/entities/prize";
import { apiAuth } from "@/services/api";
import { mapperPrize, prizeToJson } from "@/helpers/mappers/prize";

const usePrizeStore = defineStore("prize", () => {
  const { exec, loading, alertMessage } = useApiResult();
  const dataFormPrize = reactive<Prize>({ ...initialPrize });
  const prizes = reactive<Prize[]>([]);

  const setDataFormPrize = (prize: Prize) => {
    Object.assign(dataFormPrize, prize);
  };

  const clearDataFormPrize = () => {
    Object.assign(dataFormPrize, initialPrize);
  };

  const getPrizes = async (id: number) => {
    await exec(() => apiAuth.get(`/prize/raffle/${id}`), {
      mapper(res) {
        const extractedData = res.data.data ?? [];
        return extractedData.map(mapperPrize);
      },
      onSuccess: (data) => {
        prizes.splice(0, prizes.length, ...data);
      },
      onError: (_) => {},
    });
  };

  const getPrizesBySlug = async (slug: string) => {
    await exec(() => apiAuth.get(`/prize/public/raffle/${slug}`), {
      mapper(res) {
        const extractedData = res.data.data ?? [];
        return extractedData.map(mapperPrize);
      },
      onSuccess: (data) => {
        prizes.splice(0, prizes.length, ...data);
      },
      onError: (_) => {},
    });
  };

  const getPrize = async (id: number) => {
    return await exec(() => apiAuth.get(`/prize/${id}`), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error("Error al obtener el premio.");
        }
        return mapperPrize(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(dataFormPrize, data);
      },
      onError: (_) => {},
    });
  };

  const addPrize = async () => {
    return await exec(
      () => apiAuth.post("/prize", prizeToJson(dataFormPrize)),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error("Error al agregar el premio.");
          }
          return mapperPrize(extractedData);
        },
        onSuccess: (data) => {
          Object.assign(dataFormPrize, data);
        },
        onError: (_) => {},
      },
    );
  };

  const updatePrize = async () => {
    return await exec(
      () =>
        apiAuth.put(`/prize/${dataFormPrize.id}`, prizeToJson(dataFormPrize)),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error("Error al actualizar el premio.");
          }
          return mapperPrize(extractedData);
        },
        onSuccess: (data) => {
          Object.assign(dataFormPrize, data);
        },
        onError: (_) => {},
      },
    );
  };

  const deletePrize = async (raffleId: number, prizeId: number) => {
    return await exec(
      () => apiAuth.delete(`/prize/raffle/${raffleId}/prize/${prizeId}`),
      {
        mapper(data) {
          const extractedData = data.data.message ?? null;
          if (!extractedData) {
            throw new Error("Error al eliminar el premio.");
          }

          return extractedData;
        },
        onSuccess: () => {
          const index = prizes.findIndex((p) => p.id === prizeId);
          if (index !== -1) {
            prizes.splice(index, 1);
          }
        },
        onError: (_) => {},
      },
    );
  };

  return {
    loading,
    alertMessage,
    dataFormPrize,
    prizes,
    setDataFormPrize,
    clearDataFormPrize,
    getPrizes,
    getPrizesBySlug,
    getPrize,
    addPrize,
    updatePrize,
    deletePrize,
  };
});

export default usePrizeStore;
