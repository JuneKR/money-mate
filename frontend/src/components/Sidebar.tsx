import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Image from 'next/image';
import icon1 from '@/images/Profile/img_pf_yk2.jpg'
import {Menu, MenuItem, Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GridViewIcon from '@mui/icons-material/GridView';
import ElderlyIcon from '@mui/icons-material/Elderly';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';

import { useRouter } from 'next/router'
const drawerWidth = 240;


const openedMixin = (theme: Theme): CSSObject => ({
   width: drawerWidth,
   transition: theme.transitions.create('width', {
     easing: theme.transitions.easing.sharp,
     duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: 'hidden',
 });


 const closedMixin = (theme: Theme): CSSObject => ({
   transition: theme.transitions.create('width', {
     easing: theme.transitions.easing.sharp,
     duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: 'hidden',
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up('sm')]: {
     width: `calc(${theme.spacing(8)} + 1px)`,
   },
 });


 const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   padding: theme.spacing(0, 1),
   backgroundColor: '#E5F8FF',
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
 }));


 interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
 }


 const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
 })<AppBarProps>(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(['width', 'margin'], {
     easing: theme.transitions.easing.sharp,
     duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
     marginLeft: drawerWidth,
     width: `calc(100% - ${drawerWidth}px)`,
     transition: theme.transitions.create(['width', 'margin'], {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.enteringScreen,
     }),
   }),
 }));

 interface Profile {
  User_ID: number;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Gender: string;
  RiskLevel: string;
  Email: string;
}

interface SidebarProps {
    title: string;
    profile: Profile
  }
  

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
   ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      
      ...(open && {
         ...openedMixin(theme),
         '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
         ...closedMixin(theme),
         '& .MuiDrawer-paper': closedMixin(theme),
      }),
   }),
);

  const Sidebar: React.FC<SidebarProps> = ({ title, profile }) => {
    const { FirstName } = profile;

    const router = useRouter();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open2 = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleMenuClose1 = () => {
      setAnchorEl(null);
      router.push('/ProfileManagement/userProfile');
    };


    const urlClient = 'http://localhost:3000/'
    const urlServer = 'http://localhost:8080/'
    const logoutUser = async () => {
      try {
          console.log('Logout Called')
          const response = await fetch(urlServer+'logout', {
              method: 'DELETE',
              credentials: 'include'
          })
          if (response.ok) {
              // const data = await response.json();
              // const { token } = data;
              console.log('Logout successfully')
              router.push(urlClient+'UserManagement/login');
          }
          else {
              const errorData = await response.json();
              console.log(errorData);
          }
      } catch(error) {
          console.error(error)
      }
    }
  
    const handleLogout = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      await logoutUser();
    }

    const handleMenuClose2 = () => {
      setAnchorEl(null);
      router.push('/EmergencyPages/emergencyHomepage');
    };
    return (
      <div>
      <Box sx={{ display: 'flex'}}>
      <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar style={{ backgroundColor: '#1C272D' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {`สวัสดี ${FirstName}`}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              sx={{ marginLeft: 'auto' }}
            >
              {/* <Avatar alt="Profile Image" src='@.'/> */}
              <Avatar>
                <Image
                  src={icon1}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
              </Avatar> 
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={open2}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  width: '20ch',
                  maxHeight: '40vh'
                }
              }}
            >
              <MenuItem onClick={handleMenuClose1}>Profile</MenuItem>
              <MenuItem onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => handleLogout(e)}>Log out</MenuItem>
              {/* <MenuItem onClick={handleLogout}>Log out</MenuItem> */}
            </Menu>
          </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
            Logo
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List style={{backgroundColor: '#9FC6D5'}}>
          {['Home', 'Saving', 'Emergency', 'Goal-Based', 'Retirement', 'Investment', 'Overview', 'Profile'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => {
                  switch (index) {
                    case 0:
                      router.push('/');
                      break;
                    case 1:
                      router.push('/');
                      break;
                    case 2:
                      router.push('/EmergencyPages/emergencyDashboard');
                      break;
                    case 3:
                      router.push('/');
                      break;
                    case 4:
                      router.push('/');
                      break;
                    case 5:
                      router.push('/EmergencyPages/emergencyInvestmentDashboard');
                      break;
                    case 6:
                      router.push('/');
                      break;
                    case 7:
                      router.push('/ProfileManagement/userProfile');
                      break;
                    // Add more cases for each button
                    default:
                      break;
                  }
                }}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  { index === 0 ? <HomeIcon /> : null}
                  { index === 1 ? <SavingsIcon /> : null}
                  { index === 2 ? <AccountBalanceWalletIcon/> : null}
                  { index === 3 ? <GridViewIcon/> : null}
                  { index === 4 ? <ElderlyIcon/> : null}
                  { index === 5 ? <AttachMoneyIcon/> : null}
                  { index === 6 ? <BarChartIcon/> : null}
                  { index === 7 ? <PersonIcon/> : null}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      </Box>
      </div>
    );
  };

  export default Sidebar;