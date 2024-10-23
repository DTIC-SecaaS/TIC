import * as React from "react";
import { getOptionTextByKey, assetItems } from "../../../constants/consts";
import axios from "axios";
import { toast } from "../../shared/ToastService";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ASSETS_API_URL,
});

export const columns = [
  {
    field: "name",
    headerName: getOptionTextByKey(assetItems, "name"),
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: "description",
    headerName: getOptionTextByKey(assetItems, "description"),
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 1.5,
    minWidth: 100,
  },
  {
    field: "ip",
    headerName: getOptionTextByKey(assetItems, "ip"),
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 1.5,
    minWidth: 100,
  },
  {
    field: "status",
    headerName: getOptionTextByKey(assetItems, "status"),
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 1.5,
    minWidth: 100,
  },
];

// // Función para obtener los activos desde la API
export const fetchAssets = async () => {
  const response = await apiClient.get(); // Ajusta la URL según tu configuración
  return response.data;
};

// Función para agregar un nuevo activo
export const addAsset = async (newAsset) => {
  const response = await apiClient.post("", newAsset); // Ajusta la URL según tu configuración
  return response.data;
};

// Función para editar un activo
export const updateAsset = async (id, updatedAsset) => {
  const response = await apiClient.put(`/${id}`, updatedAsset); // Ajusta la URL según tu configuración
  return response.data;
};

// Función para eliminar un activo
export const deleteAsset = async (id) => {
  await apiClient.delete(`/${id}`); // Ajusta la URL según tu configuración
};

export const useAssetsData = () => {
  const [rows, setRows] = React.useState([]);

  const loadAssets = async () => {
    try {
      const data = await fetchAssets();
      if (data && data.code === "200" && Array.isArray(data.data)) {
        setRows(data.data); // Asegúrate de acceder a data.data
      } else {
        console.error("La respuesta no tiene la estructura esperada:", data);
      }
    } catch (error) {
      console.error("Error al cargar los activos:", error);
    }
  };

  React.useEffect(() => {
    loadAssets(); // Carga inicial de activos
  }, []);

  const handleAddAsset = async (newAsset) => {
    try {
      await addAsset(newAsset);
      await loadAssets(); // Recargar activos después de agregar
      toast.show("Activo agregado con éxito.", "success");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.show("El activo ya existe.", "warning");
      } else {
        toast.show("Error al agregar el activo.", "error");
      }
    }
  };

  const handleUpdateAsset = async (id, updatedAsset) => {
    try {
      await updateAsset(id, updatedAsset);
      await loadAssets(); // Recargar activos después de actualizar
      toast.show("Activo actualizado con éxito.", "success");
    } catch (error) {
      toast.show("Error al actualizar el activo.", "error");
    }
  };

  const handleDeleteAsset = async (id) => {
    try {
      await deleteAsset(id);
      await loadAssets(); // Recargar activos después de eliminar
      toast.show("Activo eliminado con éxito.", "success");
    } catch (error) {
      toast.show("Error al eliminar el activo.", "error");
    }
  };

  return { rows, handleAddAsset, handleUpdateAsset, handleDeleteAsset };
};
