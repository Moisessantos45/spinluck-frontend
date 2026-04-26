import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiResult } from "@/composables/useApiResult";
import { apiAuth } from "@/services/api";
import { mapperStorage } from "@/helpers/mappers/storage";

const useStorageStore = defineStore("storage", () => {
  const { exec, loading } = useApiResult();
  const fileUrl = ref<string>("");

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    return await exec(
      () =>
        apiAuth.post("/storage/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error("Error al subir el archivo.");
          }

          return mapperStorage(extractedData);
        },
        onSuccess: (data) => {
          fileUrl.value = data?.url ?? "";
        },
        onError: (_) => {},
      },
    );
  };

  const uploadFileUpdate = async (file: File, fileId: string) => {
    const formData = new FormData();
    formData.append("image", file);

    return await exec(
      () =>
        apiAuth.put(`/storage/upload/${fileId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      {
        mapper(res) {
          const extractedData = res.data.data ?? null;
          if (!extractedData) {
            throw new Error("Error al actualizar el archivo.");
          }

          return mapperStorage(extractedData);
        },
        onSuccess: (data) => {
          fileUrl.value = data?.url ?? "";
        },
        onError: (_) => {},
      },
    );
  };

  const deleteFile = async (fileId: string) => {
    await exec(() => apiAuth.delete(`/storage/file/${fileId}`), {
      mapper(data) {
        const extractedData = data.data.message ?? null;
        if (!extractedData) {
          throw new Error("Error al eliminar el archivo.");
        }
        return extractedData;
      },
      onSuccess: () => {
        fileUrl.value = "";
      },
      onError: (_) => {},
    });
  };

  return {
    loading,
    fileUrl,
    uploadFile,
    uploadFileUpdate,
    deleteFile,
  };
});

export default useStorageStore;
