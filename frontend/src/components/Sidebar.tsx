import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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
interface SidebarProps {
    title: string;
    
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


  const Sidebar: React.FC<SidebarProps> = ({ title }) => {
    const router = useRouter();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleEmergencyHomePage = () => {
      router.push('/EmergencyPages/emergencyDashboard')
    }
    const handleDrawerClose = () => {
      setOpen(false);
    };
    return (
      <div>
      <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar style={{backgroundColor: '#1C272D',}}>
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
            Welcome Babu!
          </Typography>
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
                      router.push('/EmergencyPages/emergencyHomepage');
                      break;
                    case 3:
                      router.push('/EmergencyPages/emergencyHomepage');
                      break;
                    case 4:
                      router.push('/EmergencyPages/emergencyHomepage');
                      break;
                    case 5:
                      router.push('/EmergencyPages/emergencyHomepage');
                      break;
                    case 6:
                      router.push('/EmergencyPages/emergencyHomepage');
                      break;
                    case 7:
                      router.push('/EmergencyPages/emergencyHomepage');
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