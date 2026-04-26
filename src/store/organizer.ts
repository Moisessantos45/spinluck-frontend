import { reactive } from "vue";
import { defineStore } from "pinia";
import useAuthStore from "./auth";
import { useApiResult } from "@/composables/useApiResult";
import {
  initialOrganizer,
  initialOrganizerDashboardMetrics,
  type Organizer,
} from "@/entities/organizer";
import { apiAuth } from "@/services/api";
import {
  mapperOrganizer,
  mapperOrganizerDashboardMetrics,
  organizerToJson,
} from "@/helpers/mappers/organizer";

const useOrganizerStore = defineStore("organizer", () => {
  const { exec, loading } = useApiResult();
  const authStore = useAuthStore();
  const dataForm = reactive<Organizer>({ ...initialOrganizer });
  const dataDashboardMetrics = reactive({
    ...initialOrganizerDashboardMetrics,
  });

  const getOrganizerDashboardMetrics = async () => {
    await exec(() => apiAuth.get("/organizer/dashboard-metrics"), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error(
            "Error al obtener las métricas del dashboard del organizador. Por favor, intenta de nuevo.",
          );
        }
        return mapperOrganizerDashboardMetrics(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(dataDashboardMetrics, data);
      },
      onError: (_) => {},
    });
  };

  const getOrganizer = async () => {
    await exec(() => apiAuth.get("/organizer"), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error(
            "Error al obtener el organizador. Por favor, intenta de nuevo.",
          );
        }
        return mapperOrganizer(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(dataForm, data);
      },
      onError: (_) => {},
    });
  };

  const addOrganizer = async () => {
    return await exec(
      () => apiAuth.post("/organizer", organizerToJson(dataForm)),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error(
              "Error al iniciar sesión. Por favor, intenta de nuevo.",
            );
          }
          return mapperOrganizer(extractedData);
        },
        onSuccess: (data) => {
          Object.assign(dataForm, data);
          authStore.getSession();
        },
        onError: (_) => {},
      },
    );
  };

  const updateOrganizer = async () => {
    return await exec(
      () => apiAuth.put("/organizer", organizerToJson(dataForm)),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error(
              "Error al actualizar el organizador. Por favor, intenta de nuevo.",
            );
          }
          return mapperOrganizer(extractedData);
        },
        onSuccess: (data) => {
          Object.assign(dataForm, data);
          alert("Organizador actualizado exitosamente.");
        },
        onError: (_) => {},
      },
    );
  };

  return {
    loading,
    dataForm,
    dataDashboardMetrics,
    getOrganizerDashboardMetrics,
    getOrganizer,
    addOrganizer,
    updateOrganizer,
  };
});

export default useOrganizerStore;
