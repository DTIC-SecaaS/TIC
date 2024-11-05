import * as React from "react";
import { getOptionTextByKey, layerItems } from "../../../constants/consts";
import axios from "axios";
import { toast } from "../../shared/ToastService";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const columns = [
  {
    field: "name",
    headerName: getOptionTextByKey(layerItems, "name"),
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 1.5,
    minWidth: 200,
  },
  // {
  //   field: "description",
  //   headerName: getOptionTextByKey(assetItems, "description"),
  //   headerClassName: "super-app-theme--header",
  //   headerAlign: "center",
  //   align: "center",
  //   flex: 1.5,
  //   minWidth: 100,
  // },
  // {
  //   field: "ip",
  //   headerName: getOptionTextByKey(assetItems, "ip"),
  //   headerClassName: "super-app-theme--header",
  //   headerAlign: "center",
  //   align: "center",
  //   flex: 1.5,
  //   minWidth: 100,
  // },
  {
    field: "status",
    headerName: getOptionTextByKey(layerItems, "status"),
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 1.5,
    minWidth: 100,
  },
];

export const fetchLayer = async () => {
  const response = await apiClient.get("/layers");
  return response.data;
};

export const addLayer = async (newLayer) => {
  const response = await apiClient.post("/layers", newLayer);
  return response.data;
};

export const updateLayer = async (id, updatedLayer) => {
  const response = await apiClient.put(`/layers/${id}`, updatedLayer);
  return response.data;
};

export const deleteLayer = async (id) => {
  await apiClient.delete(`/layers/${id}`);
};

export const useLayersData = () => {
  const [rows, setRows] = React.useState([]);

  const loadLayers = async () => {
    try {
      const data = await fetchLayer();
      if (data && data.code === "200" && Array.isArray(data.data)) {
        setRows(data.data); // Asegúrate de acceder a data.data
      } else {
        console.error("La respuesta no tiene la estructura esperada:", data);
      }
    } catch (error) {
      console.error("Error al cargar las capas de red:", error);
    }
  };

  React.useEffect(() => {
    loadLayers();
  }, []);

  const handleAddLayer = async (newLayer) => {
    try {
      await addLayer(newLayer);
      await loadLayers();
      toast.show("Capa de red agregada con éxito.", "success");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.show("La capa de red ya existe.", "warning");
      } else {
        toast.show("Error al agregar capa de red.", "error");
      }
    }
  };

  const handleUpdateLayer = async (id, updatedLayer) => {
    try {
      await updateLayer(id, updatedLayer);
      await loadLayers();
      toast.show("Capa de red actualizada con éxito.", "success");
    } catch (error) {
      toast.show("Error al actualizar la capa de red.", "error");
    }
  };

  const handleDeleteLayer = async (id) => {
    try {
      await deleteLayer(id);
      await loadLayers();
      toast.show("Capa de red eliminada con éxito.", "success");
    } catch (error) {
      toast.show("Error al eliminar la capa de red.", "error");
    }
  };

  return { rows, handleAddLayer, handleUpdateLayer, handleDeleteLayer };
};
