import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RatingCard from '../Rating/Rating';
import './Card.css'

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

const costo = 1000;

export default function CardContratada() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        M
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Matematica"
                subheader="Semanal"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Descripción: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Profesor: Juan Perez
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Duración: 1 hora
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Costo: ${costo}
                </Typography>
                <br />
                <div className='contratar-button'>
                    <input id='finalizar' type="button" value="Finalizar" />
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Calificacion">
                    <RatingCard disabled />
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
                    <input id='comentar' type="text" placeholder='Comentar' />
                </CardContent>
            </Collapse>
        </Card>
    );
}
