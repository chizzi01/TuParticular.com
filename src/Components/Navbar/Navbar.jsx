import './Navbar.css'
import logoNav from '../../img/Tu Particular2.png';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Ingresar from './Ingresar';
import axios from 'axios';

const pages = ['Inicio', 'Clases'];


const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePerfil = async () => {
    await axios.get('http://localhost:3900/api/profile', {
      headers: { "x-auth-token": localStorage.getItem('token') }
    })
      .then(res => {
        if (res.status === 200) {
          if (res.data.rol === 'Alumno')
            return window.location = '/Alumno';
        }
        window.location = '/Profesor';
      }).catch(err => {
        if (err.code === "ERR_BAD_REQUEST") {
          window.location = '/Login';
        };
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/Inicio';
  };

  const checkToken = () => {
    if (localStorage.getItem('token')) {
      return (true);
    };
    return (false);

  };

  checkToken();


  return (
    <div className="navBar">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logoNav} id='imgDesk' className='imageDesign' />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Amaranth',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Tu Particular
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    <Link
                      style={{ textDecoration: 'none', color: 'white ' }}
                      to={`/${page}`}
                    >
                      {page}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <img src={logoNav} alt="" id='imgRes' className='imageDesign' />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Amaranth',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Tu Particular
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Amaranth', fontWeight: 700, letterSpacing: '.1rem' }}
                >
                  <Link to={`/${page}`}>
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
            <div className='ingresar'>
              {checkToken() ? "" : <Ingresar />}
            </div>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon sx={{ color: "white", fontSize: '35px' }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <a onClick={handlePerfil} className='ColorA'><Typography textAlign="center">Mi perfil</Typography></a>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <a className='ColorA' onClick={handleLogout}><Typography textAlign="center">Cerrar Sesion</Typography></a>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
