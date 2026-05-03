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
  let organizerRequest: Promise<void> | null = null;
  let dashboardMetricsRequest: Promise<void> | null = null;
  let lastOrganizerFetch = 0;
  let lastDashboardMetricsFetch = 0;
  const MIN_FETCH_INTERVAL_MS = 1000;

  const getOrganizerDashboardMetrics = async () => {
    if (Date.now() - lastDashboardMetricsFetch < MIN_FETCH_INTERVAL_MS) return;
    if (dashboardMetricsRequest) return dashboardMetricsRequest;
    lastDashboardMetricsFetch = Date.now();

    dashboardMetricsRequest = (async () => {
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
    })();

    try {
      await dashboardMetricsRequest;
    } finally {
      dashboardMetricsRequest = null;
    }
  };

  const getOrganizer = async () => {
    if (Date.now() - lastOrganizerFetch < MIN_FETCH_INTERVAL_MS) return;
    if (organizerRequest) return organizerRequest;
    lastOrganizerFetch = Date.now();

    organizerRequest = (async () => {
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
    })();

    try {
      await organizerRequest;
    } finally {
      organizerRequest = null;
    }
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
