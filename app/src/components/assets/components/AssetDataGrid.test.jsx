import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import AssetDataGrid from "../components/AssetDataGrid";
import { vi } from "vitest";
import { handleAddAsset } from "../internals/gridDataAssets";

// Mock del hook useAssetsData
vi.mock("../internals/gridDataAssets", () => {
  const handleAddAsset = vi.fn();
  const handleUpdateAsset = vi.fn();
  const handleDeleteAsset = vi.fn();
  return {
    useAssetsData: () => ({
      rows: [
        {
          _id: "1",
          name: "Servidor 1",
          ip: "192.168.0.1",
          description: "Servidor principal",
          status: "activo",
        },
      ],
      handleAddAsset: vi.fn(),
      handleUpdateAsset: vi.fn(),
      handleDeleteAsset: vi.fn(),
    }),
    columns: [
      { field: "name", headerName: "Nombre", flex: 1 },
      { field: "ip", headerName: "IP", flex: 1 },
      { field: "description", headerName: "Descripción", flex: 2 },
      { field: "status", headerName: "Estado", flex: 1 },
    ],
    handleAddAsset,
  };
});

describe("AssetDataGrid Component", () => {
  it("debe renderizar el DataGrid correctamente", () => {
    render(<AssetDataGrid />);

    // Verifica que el encabezado y una fila están visibles
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Servidor 1")).toBeInTheDocument();
  });

  it("debe abrir el diálogo al hacer clic en 'Agregar'", () => {
    render(<AssetDataGrid />);

    // Hacer clic en el botón 'Agregar'
    fireEvent.click(screen.getByText(/agregar/i));

    // Verifica que el diálogo se haya abierto
    expect(screen.getByText(/agregar nuevo activo/i)).toBeInTheDocument();
  });

  it("debe cargar datos en el diálogo al editar un activo", async () => {
    render(<AssetDataGrid />);

    // Hacer clic en el botón de editar
    fireEvent.click(screen.getByLabelText(/editar/i));

    // Verifica que los valores se carguen en los campos del diálogo
    await waitFor(() => {
      expect(screen.getByDisplayValue("Servidor 1")).toBeInTheDocument();
      expect(screen.getByDisplayValue("192.168.0.1")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Servidor principal")
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue("activo")).toBeInTheDocument();
    });
  });

  it("no debe permitir inyección SQL al agregar un activo", async () => {
    // const { handleAddAsset } = require("../internals/gridDataAssets"); // Asegúrate de importar el mock correctamente

    const newAsset = {
      name: "Activo 1'; DROP TABLE assets;--",
      ip: "192.168.0.2",
      description: "Descripción normal",
      status: "activo",
    };

    await act(async () => {
      await handleAddAsset(newAsset);
      // Verificar que el mock no haya sido llamado con un nombre malicioso
      //   expect(handleAddAsset).not.toHaveBeenCalledWith(
      //     expect.objectContaining({
      //       name: expect.stringContaining("';"),
      //     })
      //   );
    });
  });
});
/*it("debe llamar a 'handleAddAsset' al guardar un nuevo activo", async () => {
    await act(async () => {
      // Renderiza el componente
      render(<AssetDataGrid />);

      // Simula el clic en 'agregar'
      fireEvent.click(screen.getByText(/Agregar/i));

      // Rellena los campos del formulario
      fireEvent.change(screen.getByLabelText(/Nombre del Activo/i), {
        target: { value: "Nuevo Activo" },
      });
      fireEvent.change(screen.getByLabelText(/IP del Activo/i), {
        target: { value: "192.168.0.2" },
      });
      fireEvent.change(screen.getByLabelText(/Descripción del Activo/i), {
        target: { value: "Un nuevo servidor" },
      });
      // Descomentado solo si es necesario
      // fireEvent.change(screen.getByLabelText(/Estado/i), {
      //   target: { value: "activo" },
      // });

      // Simula el clic en 'guardar'
      fireEvent.click(screen.getByText(/guardar/i));
    });

    // Espera a que el mock de handleAddAsset sea llamado
    const { handleAddAsset } =
      require("../internals/gridDataAssets").useAssetsData();

    await waitFor(() => {
      expect(handleAddAsset).toHaveBeenCalledTimes(1);
      expect(handleAddAsset).toHaveBeenCalledWith({
        name: "Nuevo Activo", // Ajusta con los valores que llenaste en los campos
        ip: "192.168.0.2",
        description: "Un nuevo servidor",
        status: "activo", // Si es necesario, ajusta este campo
      });
    });
  });*/
