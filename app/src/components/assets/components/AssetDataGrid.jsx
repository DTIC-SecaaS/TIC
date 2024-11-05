// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { columns, rows } from "../internals/data/gridDataVulns";

// export default function AssetDataGrid() {
//   return (
//     <DataGrid
//       autoHeight
//       // checkboxSelection
//       rows={rows}
//       columns={columns}
//       getRowClassName={(params) =>
//         params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
//       }
//       initialState={{
//         pagination: { paginationModel: { pageSize: 10 } },
//       }}
//       pageSizeOptions={[10, 20, 50]}
//       disableColumnResize
//       density="compact"
//       //loading
//       slotProps={{
//         filterPanel: {
//           filterFormProps: {
//             logicOperatorInputProps: {
//               variant: "outlined",
//               size: "small",
//             },
//             columnInputProps: {
//               variant: "outlined",
//               size: "small",
//               sx: { mt: "auto" },
//             },
//             operatorInputProps: {
//               variant: "outlined",
//               size: "small",
//               sx: { mt: "auto" },
//             },
//             valueInputProps: {
//               InputComponentProps: {
//                 variant: "outlined",
//                 size: "small",
//               },
//             },
//           },
//         },
//         // loadingOverlay: {
//         //   variant: "skeleton",
//         //   noRowsVariant: "skeleton",
//         // },
//       }}
//     />
//   );
// }
import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { columns, useAssetsData } from "../internals/gridDataAssets";
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

export default function AssetDataGrid() {
  // const [rows, setRows] = React.useState(initialRows);
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [newName, setNewName] = React.useState("");
  const [newIp, setNewIp] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [newStatus, setNewStatus] = React.useState("Inactivo");

  const { rows, handleAddAsset, handleUpdateAsset, handleDeleteAsset } =
    useAssetsData();

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setNewName(row.name);
    setNewIp(row.ip);
    setNewDescription(row.description);
    setNewStatus(row.status);
    setIsEditing(true);
    setOpen(true);
  };

  const handleAddClick = () => {
    setNewName("");
    setNewIp("");
    setNewDescription("");
    setNewStatus(false);
    setIsEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleSave = async () => {
    const newAsset = {
      name: newName,
      ip: newIp,
      description: newDescription,
      status: newStatus,
    };
    if (isEditing && selectedRow) {
      await handleUpdateAsset(selectedRow._id, newAsset);
    } else {
      await handleAddAsset(newAsset);
    }
    handleClose();
  };

  // const handleDeleteClick = (id) => {
  //   setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  // };

  // Añade la columna de acciones (editar y eliminar)
  // const columns = [
  //   ...initialColumns,
  //   {
  //     field: "actions",
  //     headerName: "Acciones",
  //     type: "actions",
  //     headerClassName: "super-app-theme--header",
  //     minWidth: 100,
  //     getActions: (params) => [
  //       <GridActionsCellItem
  //         icon={<EditIcon />}
  //         label="Editar"
  //         color="secondary"
  //         sx={{ height: 30 }}
  //         onClick={() => handleEditClick(params.row)}
  //       />,
  //       <GridActionsCellItem
  //         icon={<DeleteIcon />}
  //         label="Eliminar"
  //         onClick={() => handleDeleteAsset(params.id)}
  //       />,
  //     ],
  //   },
  // ];

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
        onClick={() => handleDeleteAsset(params.id)}
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
  // const CustomToolbar = () => (
  //   <GridToolbarContainer>
  //     <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddClick}>
  //       Agregar
  //     </Button>
  //   </GridToolbarContainer>
  // );

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
          {isEditing ? "Editar Activo" : "Agregar nuevo activo"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            margin="dense"
            label="Nombre del Activo"
            fullWidth
            variant="standard"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            id="description"
            name="description"
            margin="dense"
            label="Descripción del Activo"
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
            label="IP del Activo"
            fullWidth
            variant="standard"
            value={newIp}
            onChange={(e) => setNewIp(e.target.value)}
          />
          <FormControl fullWidth margin="dense" sx={{ mt: 3 }}>
            <InputLabel htmlFor="status-label">Estado</InputLabel>
            <Select
              autoFocus
              labelId="status-label"
              id="status"
              required
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
