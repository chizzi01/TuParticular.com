import React from 'react';
import './Clases.css';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RatingClases from '../Rating/RatingClases';
import '../Card/Card.css';
import axios from 'axios';
import '../Searchbar/Searchbar.css';
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

function ClaseCard({ claseData }) {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const generateRandomColor = () => {
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return "#" + randColor.toUpperCase();
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: generateRandomColor() }} aria-label="recipe">
            {claseData.nombre[0]}
          </Avatar>
        }
        title={claseData.nombre}
        subheader={claseData.frecuencia}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Descripción: {claseData.descripcion}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Profesor: {claseData.profesor}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Duración: {claseData.duracion}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Costo: ${claseData.precio}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Tipo: {claseData.tipo}
        </Typography>
        <br />
        <div className='contratar-button'>
          <a href={"/Contratar?id=" + claseData._id + "&clase=" + claseData.nombre}><input type="button" value="Contratar" /></a>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <div className='calificacion'>
          <RatingClases claseData={claseData} />
          <p>{"(" + claseData.calificadores.length + ")"}</p>
        </div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comentarios</Typography>
          {claseData.comentarios.map(comentario => (
            <div>
              {/* <strong>{comentario.alumno}</strong> */}
              <p> {comentario.texto} </p>
            </div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}



function Searchbar(handleChange) {
  const [open, setOpen] = React.useState(false);
  const [cla, setClase] = React.useState('');
  const [fre, setFrecuencia] = React.useState('');
  const [rat, setRating] = React.useState('');
  const [inputText, setInputText] = React.useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const handleChangeCla = (event) => {
    setClase(String(event.target.value) || '');
    handleChange.handleChange({
      tipoFilter: event.target.value, 
      frecuenciaFilter: fre || "",
      ratingFilter: rat || "",
      textFilter: inputText || ""
    })
  };

  const handleChangeFre = (event) => {
    setFrecuencia(String(event.target.value) || '');
    handleChange.handleChange({
      tipoFilter: cla || "", 
      frecuenciaFilter: event.target.value,
      ratingFilter: rat || "",
      textFilter: inputText || ""
    })
  };

  const handleChangeRat = (event) => {
    setRating(String(event.target.value) || '');
    handleChange.handleChange({
      tipoFilter: cla || "", 
      frecuenciaFilter: fre || "",
      ratingFilter: event.target.value,
      textFilter: inputText || ""
    })
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };



  return (
    <div>
      <input className='text-input' id='filtroMateria' type="text" placeholder='Materia' onChange={(event) => handleChange.handleChange({
        textFilter: event.target.value,
        tipoFilter: cla || "",
        frecuenciaFilter: fre || "",
        ratingFilter: rat || ""
      })} />
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
                <MenuItem value="" >
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


class Clases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clases: [],
      clasesFiltradas: [],
    };
    this.Searchbar = React.createRef();

  }



  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
  }

  getData = () => {
    axios.get('http://localhost:3900/api/clases/all', {
      headers: { "x-auth-token": localStorage.getItem('token') }
    }).then(res => {
      let clases = res.data;
      this.setState({ clases, clasesFiltradas: clases });
    }).catch(err => {
      console.log(err);
    })
  }

  handleChange = (event) => {
    let newData = {
      clasesFiltradas: this.state.clases.filter(clase => {
        const textFilter = (event.textFilter.toLowerCase() !== "" ? event.textFilter.toLowerCase() : clase.nombre.toLowerCase());
        const tipoFilter = (event.tipoFilter.toLowerCase() !== "" ? event.tipoFilter.toLowerCase() : clase.tipo.toLowerCase())
        const frecuenciaFilter = (event.frecuenciaFilter.toLowerCase() !== "" ? event.frecuenciaFilter.toLowerCase() : clase.frecuencia.toLowerCase())
        const ratingFilter = (event.ratingFilter !== "" ? event.ratingFilter : (clase.rating ? Math.floor(clase.rating/clase.calificadores.length) : 1))
        console.log(Math.floor(clase.rating / clase.calificadores.length));
        return clase.nombre.toLowerCase().includes(textFilter) &&
          clase.tipo.toLowerCase() == (tipoFilter) &&
          clase.frecuencia.toLowerCase() == (frecuenciaFilter) &&
          (clase.rating ? Math.floor(clase.rating / clase.calificadores.length) : 1) == (ratingFilter)
      })
    }
    this.setState(newData);
  }
//breakpoint
  render() {
    return (
      <div className="Clases">
        <div className='searchbar-container'>
          <Searchbar handleChange={this.handleChange} />
        </div>
        <div className='cards-container'>
          {this.state.clasesFiltradas.map((clase) => (
            <div className='card-align'>
              <ClaseCard claseData={clase} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default Clases;
