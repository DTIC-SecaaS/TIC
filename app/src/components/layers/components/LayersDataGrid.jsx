import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { columns, useLayersData } from "../internals/gridDataLayers";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { layerItems, getOptionTextByKey } from "../../../constants/consts";

export default function LayersDataGrid() {
  // const [rows, setRows] = React.useState(initialRows);
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [newName, setNewName] = React.useState("");
  //   const [newIp, setNewIp] = React.useState("");
  //   const [newDescription, setNewDescription] = React.useState("");
  const [newStatus, setNewStatus] = React.useState("Inactivo");

  const { rows, handleAddLayer, handleUpdateLayer, handleDeleteLayer } =
    useLayersData();

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setNewName(row.name);
    // setNewIp(row.ip);
    // setNewDescription(row.description);
    setNewStatus(row.status);
    setIsEditing(true);
    setOpen(true);
  };

  const handleAddClick = () => {
    setNewName("");
    // setNewIp("");
    // setNewDescription("");
    setNewStatus(false);
    setIsEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleSave = async () => {
    const newLayer = {
      name: newName,
      //   ip: newIp,
      //   description: newDescription,
      status: newStatus,
    };
    if (isEditing && selectedRow) {
      await handleUpdateLayer(selectedRow._id, newLayer);
    } else {
      await handleAddLayer(newLayer);
    }
    handleClose();
  };

  const actionColumn = {
    field: "actions",
    headerName: "Acciones",
    type: "actions",
    headerClassName: "super-app-theme--header",
    minWidth: 100,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Editar"
        color="secondary"
        onClick={() => handleEditClick(params.row)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Eliminar"
        onClick={() => handleDeleteLayer(params.id)}
      />,
    ],
  };

  const updatedColumns = [...columns, actionColumn];

  // Toolbar personalizada
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{ height: 30, m: 1 }}
          color="secondary"
        >
          Agregar
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <>
      <DataGrid
        autoHeight
        rows={rows}
        getRowId={(row) => row._id}
        columns={updatedColumns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slots={{ toolbar: CustomToolbar }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEditing
            ? getOptionTextByKey(layerItems, "edit")
            : getOptionTextByKey(layerItems, "add")}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            margin="dense"
            label={getOptionTextByKey(layerItems, "layerName")}
            fullWidth
            variant="standard"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          {/* <TextField
            autoFocus
            required
            id="description"
            name="description"
            margin="dense"
            label={getOptionTextByKey(layerItems, "layerDescription")}
            fullWidth
            variant="standard"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            required
            id="ip"
            name="ip"
            label={getOptionTextByKey(layerItems, "layerIp")}
            fullWidth
            variant="standard"
            value={newIp}
            onChange={(e) => setNewIp(e.target.value)}
          /> */}
          <FormControl fullWidth margin="dense" sx={{ mt: 3 }}>
            <InputLabel htmlFor="status-label">
              {getOptionTextByKey(layerItems, "status")}
            </InputLabel>
            <Select
              autoFocus
              labelId="status-label"
              id="status"
              required
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="activo">
                {getOptionTextByKey(layerItems, "active")}
              </MenuItem>
              <MenuItem value="inactivo">
                {getOptionTextByKey(layerItems, "inactive")}
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {getOptionTextByKey(layerItems, "cancel")}
          </Button>
          <Button onClick={handleSave} color="primary">
            {getOptionTextByKey(layerItems, "save")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
