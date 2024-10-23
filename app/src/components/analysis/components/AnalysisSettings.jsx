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

export default function SelectSmall() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormGroup>
      {/* Primera fila con Select alineado a la izquierda, etiqueta y Switch alineado a la derecha */}
      <Grid container spacing={2}>
        {/* Contenedor para la etiqueta "Seleccionar" y el Select */}
        <Grid
          size={6}
          container
          alignItems="start"
          sx={{ backgroundColor: "yellow", px: 2 }}
        >
          {/* Etiqueta "Seleccionar" alineada verticalmente al centro */}
          <InputLabel sx={{ mr: 2, py: 1 }}>¿Capa límite?</InputLabel>
          <FormControl sx={{ minWidth: 130, py: 1 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Switch alineado a la derecha */}
        <Grid
          size={6}
          container
          justifyContent="end"
          sx={{ backgroundColor: "green", px: 2 }}
        >
          <FormControlLabel
            control={<Switch defaultChecked size="small" />}
            label="Personalizar herramientas de análisis"
            labelPlacement="start"
          />
        </Grid>
      </Grid>

      {/* Segunda fila con Accordion */}
      {/* <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Acordeón</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Contenido del acordeón. Puedes poner aquí el texto que desees
                mostrar al expandirlo.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid> */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Reemplaza el div por un Grid item */}
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
    </FormGroup>
  );
}
