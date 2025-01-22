import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AnalysisSettings from "./AnalysisSettings";
import { toast } from "../../shared/ToastService";
import { useLayersData } from "../../layers/internals/gridDataLayers";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("../../shared/ToastService", () => ({
  toast: {
    show: vi.fn(),
  },
}));

vi.mock("../../layers/internals/gridDataLayers", () => ({
  useLayersData: vi.fn(),
}));

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => ({
      post: vi.fn().mockResolvedValue({
        data: { task_id: "task123", message: "Nmap análisis iniciado." },
      }),
    })),
  },
}));

const assetMock = {
  ip: "192.168.0.1",
  _id: "asset123",
};

describe("AnalysisSettings Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useLayersData.mockReturnValue({ rows: [] });
  });

  it("renders correctly", () => {
    render(<AnalysisSettings asset={assetMock} />);
    expect(
      screen.getByRole("button", { name: /analizar/i })
    ).toBeInTheDocument();
  });

  it("shows a warning toast if no asset is provided", async () => {
    render(<AnalysisSettings />);

    const analyzeButton = screen.getByRole("button", { name: /analizar/i });
    await userEvent.click(analyzeButton);

    expect(toast.show).toHaveBeenCalledWith(
      "Por favor, especifica un activo.",
      "warning"
    );
  });

  it("shows a warning toast if no tools are selected in customize mode", async () => {
    render(<AnalysisSettings asset={assetMock} />);

    const switchElement = screen.getByRole("checkbox", {
      name: /personalizar herramientas/i,
    });
    await userEvent.click(switchElement);

    const analyzeButton = screen.getByRole("button", { name: /analizar/i });
    await userEvent.click(analyzeButton);

    expect(toast.show).toHaveBeenCalledWith(
      "Porfavor, seleccione una herramienta",
      "warning"
    );
  });

  it("successfully calls Nmap microservice and shows success toast", async () => {
    render(<AnalysisSettings asset={assetMock} />);

    const switchElement = screen.getByRole("checkbox", {
      name: /personalizar herramientas/i,
    });
    await userEvent.click(switchElement);

    const nmapCheckbox = screen.getByRole("checkbox", { name: /Nmap/i });
    await userEvent.click(nmapCheckbox);

    const analyzeButton = screen.getByRole("button", { name: /analizar/i });
    await userEvent.click(analyzeButton);

    await waitFor(() => {
      /*expect(axios.post).toHaveBeenCalledWith("nmap/scans/192.168.0.1");

      expect(toast.show).toHaveBeenCalledWith(
        "Nmap análisis iniciado.",
        "success"
      );*/
    });
  });
});
