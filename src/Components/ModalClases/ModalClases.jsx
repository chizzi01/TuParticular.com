import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ModalClases.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalClases() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button id='crear-claseBTN' onClick={handleOpen}>Crear clase</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} id='ColorBack'>
            <h3>Crear Clase</h3>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className='crearClase' action="">
                <input type="text" placeholder='Materia' />
                <input type="text" placeholder='Duración' />
                <input type="number" placeholder='Precio' />
                <input type="text" placeholder='Descripción' />
                <select name="frecuenciaModal" id="frecuenciaModal">
                  <option value="Frecuencia">Frecuencia</option>
                  <option value="Unica">Unica</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensual">Mensual</option>
                </select>
                <select name="claseModal" id="claseModal">
                  <option value="Clase">Tipo de clase</option>
                  <option value="Individual">Individual</option>
                  <option value="Grupal">Grupal</option>
                </select>
                <input type="submit" value="Crear" />
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
