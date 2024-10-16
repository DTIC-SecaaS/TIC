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
import {
  columns as initialColumns,
  rows as initialRows,
} from "../internals/gridDataAssets";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

export default function AssetDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [newName, setNewName] = React.useState("");
  const [newIp, setNewIp] = React.useState("");

  const handleDeleteClick = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setNewName(row.name);
    setNewIp(row.ip);
    setIsEditing(true);
    setOpen(true);
  };

  const handleAddClick = () => {
    console.log("Agregando");
    setNewName("");
    setNewIp("");
    setIsEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleSave = () => {
    if (isEditing && selectedRow) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === selectedRow.id ? { ...row, name: newName, ip: newIp } : row
        )
      );
    } else {
      const newId = rows.length + 1;
      const newRow = { id: newId, name: newName, ip: newIp };
      setRows((prevRows) => [...prevRows, newRow]);
    }
    handleClose();
  };

  // Añade la columna de acciones (editar y eliminar)
  const columns = [
    ...initialColumns,
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      minWidth: 250,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          color="secondary"
          sx={{ height: 30 }}
          onClick={() => handleEditClick(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => handleDeleteClick(params.id)}
        />,
      ],
    },
  ];

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
        columns={columns}
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
        <DialogTitle>Agregar nuevo activo</DialogTitle>
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
