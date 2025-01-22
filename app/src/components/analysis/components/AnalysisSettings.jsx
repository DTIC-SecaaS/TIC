import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import { useLayersData } from "../../layers/internals/gridDataLayers";
import { getOptionTextByKey, analysisItems } from "../../../constants/consts";
import Button from "@mui/material/Button";
import { toast } from "../../shared/ToastService";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AnalysisSettings = ({ asset }) => {
  const { rows } = useLayersData();
  const [selectedLayer, setSelectedLayer] = React.useState("ninguna");
  const [customizeTools, setCustomizeTools] = React.useState(false);
  const [selectedTools, setSelectedTools] = React.useState([]);

  const handleChange = (event) => {
    setSelectedLayer(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setCustomizeTools(event.target.checked);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTools((prev) => {
      if (checked) {
        return [...prev, value]; // Si está seleccionado, agregar la herramienta
      } else {
        return prev.filter((tool) => tool !== value); // Si está deseleccionado, eliminar la herramienta
      }
    });
  };

  const handleButtonClick = async () => {
    // if (selectedTools.length === 0) {
    //   toast.show("Por favor, selecciona al menos una herramienta.", "warning");
    //   return;
    // }

    if (!asset) {
      toast.show("Por favor, especifica un activo.", "warning");
      return;
    }

    // Llama al microservicio correspondiente según la selección
    if (customizeTools) {
      if (selectedTools.includes("Nmap")) {
        console.log("Llamando al microservicio de Nmap...");
        try {
          const response = await apiClient.post(
            "nmap/scans/" + encodeURIComponent(asset.ip)
          );

          const data = { task_id: response.data.task_id, asset_id: asset._id };
          sessionStorage.setItem(
            "data_" + asset._id + "_nmap_" + response.data.task_id,
            JSON.stringify(data)
          );

          toast.show(response.data.message, "success");
          // window.location.reload();
        } catch (error) {
          console.error("Error al hacer la solicitud:", error);
          toast.show("Error al hacer la solicitud:", "error");
        }
      } else if (selectedTools.includes("Nikto")) {
        console.log("Llamando al microservicio de Nikto...");
        try {
          const response = await apiClient.post("nikto/scans/" + asset.ip);
          console.log(response);

          const data = { task_id: response.data.task_id, asset_id: asset._id };
          sessionStorage.setItem(
            "data_" + asset._id + "_nikto_" + response.data.task_id,
            JSON.stringify(data)
          );

          toast.show(response.data.message, "success");
          // window.location.reload();
        } catch (error) {
          console.error("Error al hacer la solicitud:", error);
          toast.show("Error al hacer la solicitud:", "error");
        }
      } else if (selectedTools.includes("Wapiti")) {
        console.log("Llamando al microservicio de Wapiti...");
        try {
          const response = await apiClient.post(
            "wapiti/scans/" + encodeURIComponent(asset.ip)
          );

          const data = { task_id: response.data.task_id, asset_id: asset._id };
          sessionStorage.setItem(
            "data_" + asset._id + "_wapiti_" + response.data.task_id,
            JSON.stringify(data)
          );

          toast.show(response.data.message, "success");
          // window.location.reload();
        } catch (error) {
          console.error("Error al hacer la solicitud:", error);
          toast.show("Error al hacer la solicitud:", "error");
        }
      } else {
        toast.show("Porfavor, seleccione una herramienta", "warning");
      }
    } else {
      try {
        const response = await apiClient.post(
          "wapiti/scans/" + encodeURIComponent(asset.ip)
        );

        const data = { task_id: response.data.task_id, asset_id: asset._id };
        sessionStorage.setItem(
          "data_" + asset._id + "_wapiti_" + response.data.task_id,
          JSON.stringify(data)
        );

        toast.show(response.data.message, "success");
        console.log(response.data.task_id);
        // window.location.reload();
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        toast.show("Error al hacer la solicitud:", "error");
      }
    }
  };

  return (
    <FormGroup>
      <Grid container spacing={2}>
        {/* <Grid size={6} container alignItems="start" sx={{ px: 2 }}>
          <InputLabel sx={{ mr: 2, py: 1 }}>
            {getOptionTextByKey(analysisItems, "limitLayer")}
          </InputLabel>
          <FormControl sx={{ minWidth: 130, py: 1 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedLayer}
              onChange={handleChange}
            >
              <MenuItem value="ninguna" key="ninguna">
                <em>{getOptionTextByKey(analysisItems, "none")}</em>
              </MenuItem>
              {rows.length > 0 &&
                rows.map((layer) => (
                  <MenuItem key={layer._id} value={layer._id}>
                    {layer.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid> */}

        <Grid size={6} container justifyContent="end" sx={{ px: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={customizeTools}
                onChange={handleSwitchChange}
                size="small"
              />
            }
            label={getOptionTextByKey(analysisItems, "customizeTools")}
            labelPlacement="start"
          />
        </Grid>
      </Grid>

      {customizeTools && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={12} sx={{ width: "100%" }}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
              >
                <Typography>Herramientas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {["Nmap", "Nikto", "Wapiti"].map((label, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          value={label}
                          onChange={handleCheckboxChange}
                          checked={selectedTools.includes(label)}
                        />
                      }
                      label={label}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      )}

      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          {getOptionTextByKey(analysisItems, "analize")}
        </Button>
      </Grid>
    </FormGroup>
  );
};

export default AnalysisSettings;
