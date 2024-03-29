import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Image from "next/image";
import icon1 from "@/images/Profile/img_pf_yk1.jpg";
import { Menu, MenuItem, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import SavingsIcon from "@mui/icons-material/Savings";
import FlagIcon from "@mui/icons-material/Flag";
import ElderlyIcon from "@mui/icons-material/Elderly";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { urlServer, urlClient } from "@/API";


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiPaper-root": {
      borderRadius: "10px",
      // boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);",
      backgroundColor: "#1D1D41",
    },
  },
}));

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: "#1D1D41",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
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
  // profile: Profile
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#1D1D41",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar: React.FC<SidebarProps> = () => {
  const classes = useStyles();
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
    router.push("/ProfileManagement/userProfile");
  };

  const [profile, setProfile] = useState({
    User_ID: 0,
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Gender: "",
    RiskLevel: "",
    Email: "",
  });
  // const url = 'http://localhost:8080/'

  // Fetch User Profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.log("Fetching Profile Error: ", error);
      }
    }

    fetchProfile();
  }, []);

  const logoutUser = async () => {
    try {
      console.log("Logout Called");
      const response = await fetch(urlServer + "logout", {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        // const data = await response.json();
        // const { token } = data;
        console.log("Logout successfully");
        router.push(urlClient + "UserManagement/login");
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    await logoutUser();
  };

  const handleMenuClose2 = () => {
    setAnchorEl(null);
    router.push("/EmergencyPages/emergencyHomepage");
  };
  const [openDrop, setDrop] = useState(false);
  const handleClick = () => {
    setDrop(!openDrop);
  };
  const handleHomePage = () => {
    router.push("/landingPage");
  };
  const handleEmergencyDashboard = () => {
    router.push("/EmergencyPages/emergencyDashboard");
  };
  const handleGoalBasedDashboard = () => {
    router.push("/GoalBasedPages/goalBasedDashboard");
  };
  const handleRetirementDashboard = () => {
    router.push("/RetirementPages/retirementDashboard");
  };
  const handleEmergencyInvestmentDashboard = () => {
    router.push("/EmergencyPages/emergencyInvestmentDashboard");
  };
  const handleGoalBasedInvestmentDashboard = () => {
    router.push("/GoalBasedPages/goalBasedInvestmentDashboard");
  };
  const handleRetirementInvestmentDashboard = () => {
    router.push("/RetirementPages/retirementInvestmentDashboard");
  };
  const handleProfile = () => {
    router.push("/ProfileManagement/userProfile");
  };
  const handleAdmin = () => {
    router.push("/AdminPages/adminFundsAddingPage");
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar style={{ backgroundColor: "#1D1D41" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {`สวัสดี ${profile.FirstName}`}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              sx={{ marginLeft: "auto" }}
            >
              {/* <Avatar alt="Profile Image" src='@.'/> */}
              <Avatar className="transition duration-300 ease-in-out transform hover:scale-105">
                <Image src={icon1} alt="Profile Image" width={50} height={50} />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open2}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  width: "20ch",
                  maxHeight: "40vh",
                },
              }}
            >
              <MenuItem onClick={handleMenuClose1}>Profile</MenuItem>
              {/* <MenuItem onClick={handleAdmin}>Admin(debugmode)</MenuItem> */}
              <MenuItem
                onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
                  handleLogout(e)
                }
              >
                Log out
              </MenuItem>
              {/* <MenuItem onClick={handleLogout}>Log out</MenuItem> */}
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          style={{ color: "#FFFFFF" }}
          className={classes.root}
        >
          <DrawerHeader>
            <h1 className="py-2 text-3xl font-bold text-white">MoneyMate</h1>
            <IconButton onClick={handleDrawerClose} sx={{ color: "#FFFFFF" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "#1D1D41",
              color: "#FFFFFF",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton
              onClick={handleHomePage}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="หน้าหลัก" />
            </ListItemButton>
            <ListItemButton
              onClick={handleEmergencyDashboard}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <SavingsIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="ออมเงินเผื่อฉุกเฉิน" />
            </ListItemButton>
            <ListItemButton
              onClick={handleGoalBasedDashboard}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <FlagIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="ออมเงินเพื่อเป้าหมาย" />
            </ListItemButton>
            <ListItemButton
              onClick={handleRetirementDashboard}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <ElderlyIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="ออมเงินเพื่อเกษียณ" />
            </ListItemButton>
            <ListItemButton
              onClick={handleClick}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <AttachMoneyIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="การลงทุน" />
              {openDrop ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openDrop} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={handleEmergencyInvestmentDashboard}
                  className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 hover:bg-gradient-to-r from-yellow-500 to-pink-500"
                >
                  <ListItemIcon>
                    <SavingsIcon sx={{ color: "#FFFFFF" }} />
                  </ListItemIcon>
                  <ListItemText primary="ลงทุนเพื่อเงินฉุกเฉิน" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={handleGoalBasedInvestmentDashboard}
                  className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 hover:bg-gradient-to-r from-yellow-500 to-red-500"
                >
                  <ListItemIcon>
                    <FlagIcon sx={{ color: "#FFFFFF" }} />
                  </ListItemIcon>
                  <ListItemText primary="ลงทุนเพื่อเป้าหมาย" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={handleRetirementInvestmentDashboard}
                  className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 hover:bg-gradient-to-r from-yellow-500 to-green-500"
                >
                  <ListItemIcon>
                    <ElderlyIcon sx={{ color: "#FFFFFF" }} />
                  </ListItemIcon>
                  <ListItemText primary="ลงทุนเพื่อเกษียณ" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton
              onClick={handleProfile}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="โปรไฟล์" />
            </ListItemButton>
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default Sidebar;
{/* <List style={{backgroundColor: '#1D1D41'}}>
          {['Dashboard', 'เพิ่มข้อมูลกองทุน', 'สร้างพอร์ตการลงทุน', 'พอร์ตการลงทุนของคุณ', 'จัดการข้อมูลกองทุน', 'จัดการข้อมูลพอร์ตการลงทุน'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                className="transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => {
                  switch (index) {
                    case 0:
                      router.push('/');
                      break;
                    case 1:
                      router.push('/AdminPages/adminFundsAddingPage');
                      break;
                    case 2:
                      router.push('/AdminPages/adminPortsAddingPage');
                      break;
                    case 3:
                      router.push('/AdminPages/adminPortPage');
                      break;
                    case 4:
                      router.push('/AdminPages/adminFundsManagement');
                      break;
                    case 5:
                      router.push('/AdminPages/adminPortsManagement');
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
        //           { index === 0 ? <HomeIcon /> : null}
        //           { index === 1 ? <SavingsIcon /> : null}
        //           { index === 2 ? <AccountBalanceWalletIcon/> : null}
        //           { index === 3 ? <GridViewIcon/> : null}
        //           { index === 4 ? <ElderlyIcon/> : null}
        //           { index === 5 ? <AttachMoneyIcon/> : null}
        //           { index === 6 ? <BarChartIcon/> : null}
        //           { index === 7 ? <PersonIcon/> : null}
        //         </ListItemIcon>
        //         <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        //       </ListItemButton>
        //     </ListItem>
        //   ))}
        // </List> */}