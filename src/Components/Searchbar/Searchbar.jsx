import './Searchbar.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [cla, setClase] = React.useState('');
  const [fre, setFrecuencia] = React.useState('');
  const [rat, setRating] = React.useState('');
  const [inputText, setInputText] = useState("");
  const {onSearch} = props;

  const handleChangeCla = (event) => {
    setClase(Number(event.target.value) || '');
  };

  const handleChangeFre = (event) => {
    setFrecuencia(Number(event.target.value) || '');
  };

  const handleChangeRat = (event) => {
    setRating(Number(event.target.value) || '');
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleInput = (event) => {
    const text = event.target.value;
    setSearchText(text);
  };

  const handleEnterKeyPressed = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchText);
    }
  };

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  return (
    <div>
      <input className='text-input' type="text" placeholder='Materia' onChange={inputHandler} onKeyPress={handleEnterKeyPressed} value={searchText} />
      <Button onClick={handleClickOpen}>Filtrar por</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Filtros</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Clase</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={cla}
                onChange={handleChangeCla}
                input={<OutlinedInput label="Clase" />}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value={"Individual"}>Individual</MenuItem>
                <MenuItem value={"Grupal"}>Grupal</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Frecuencia</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={fre}
                onChange={handleChangeFre}
                input={<OutlinedInput label="Frecuencia" />}
              >
                <MenuItem value="">
                  <em>Ninguna</em>
                </MenuItem>
                <MenuItem value={"Unica"}>Unica</MenuItem>
                <MenuItem value={"Semanal"}>Semanal</MenuItem>
                <MenuItem value={"Mensual"}>Mensual</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Calificación</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={rat}
                onChange={handleChangeRat}
                input={<OutlinedInput label="Clase" />}
              >
                <MenuItem value="">
                  <em>0</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
