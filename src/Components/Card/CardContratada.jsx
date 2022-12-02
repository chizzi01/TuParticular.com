import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
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
import RatingCard from '../Rating/Rating';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './Card.css'
import axios from 'axios';
import clase from '../../Models/clase';

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


export default function CardContratada(claseData) {
    const [expanded, setExpanded] = React.useState(false);
    const [modalAprobar, setModalAprobar] = useState(false);
    const [changeComentario, setChangeComentario] = useState('');

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


    const finalizarClase = (claseId) => {
        axios.put(`http://localhost:3900/api/clases/finalizar/${claseId}`, {}, {
            headers: { "x-auth-token": localStorage.getItem('token') }
        })
            .then(res => {
                window.location.reload();
                console.log(res);
                console.log(res.data);
            }).catch(err => {
                console.log(err);
                alert("Error al finalizar la clase");
            })
    }

    const enviarComentario = () => {
        const comentario = document.getElementById('comentar').value;
        if (comentario === '') {
            alert('Debe ingresar un comentario');
            return;
        }
        axios.put(`http://localhost:3900/api/clases/comentar/${claseData.claseData._id}`, { comentario: comentario }, {
            headers: { "x-auth-token": localStorage.getItem('token') }
        })
            .then(res => {
                window.location.reload();
                alert("Comentario enviado");
            }).catch(err => {

                console.log(err);
                alert("Error al enviar el comentario");
            })
    }


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: generateRandomColor() }} aria-label="recipe">
                        {claseData.claseData.nombre[0]}
                    </Avatar>
                }
                title={claseData.claseData.nombre}
                subheader={claseData.claseData.frecuencia}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Descripción: {claseData.claseData.descripcion}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Profesor: {claseData.claseData.profesor}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Duración: {claseData.claseData.duracion}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Costo: ${claseData.claseData.precio}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Tipo: {claseData.claseData.tipo}
                </Typography>
                <div className='contratar-button'>
                    <input id='finalizar' type="button" value="Finalizar" onClick={() => setModalAprobar(true)} />
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Calificacion">
                    <RatingCard claseData={claseData}/>
                </IconButton>
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
                    <input id='comentar' type="text" placeholder='Comentar' onChange={(evt) => setChangeComentario(evt.value)} />
                    <button className='btn btn-success' id="enviarComentario" onClick={() => enviarComentario()}>Enviar</button>
                </CardContent>
            </Collapse>


            <Modal isOpen={modalAprobar}>
                <ModalHeader>
                    <div>
                        <h3>Finalizar suscripcion</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    Estas seguro que deseas finalizar tu suscripcion?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-danger' onClick={() => finalizarClase(claseData.claseData._id)}>Si</button>
                    <button className='btn btn-secondary' onClick={() => setModalAprobar(false)}>Cancelar</button>
                </ModalFooter>
            </Modal>

        </Card>

    );
}
