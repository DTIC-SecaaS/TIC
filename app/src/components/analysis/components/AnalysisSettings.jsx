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

export default function SelectSmall() {
  const { rows } = useLayersData();
  const [selectedLayer, setSelectedLayer] = React.useState("ninguna");
  const [customizeTools, setCustomizeTools] = React.useState(false);

  const handleChange = (event) => {
    setSelectedLayer(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setCustomizeTools(event.target.checked);
  };

  const handleButtonClick = () => {
    console.log("Botón clickeado");
  };

  return (
    <FormGroup>
      <Grid container spacing={2}>
        <Grid size={6} container alignItems="start" sx={{ px: 2 }}>
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
        </Grid>

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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Item 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {[...Array(6)].map((_, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      label={`Opción ${index + 1}`}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Item 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {[...Array(6)].map((_, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      label={`Opción ${index + 1}`}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>Item 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {[...Array(6)].map((_, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      label={`Opción ${index + 1}`}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
              >
                <Typography>Item 4</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {[...Array(6)].map((_, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      label={`Opción ${index + 1}`}
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
}
