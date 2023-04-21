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

  const urlClient = "http://localhost:3000/";
  const urlServer = "http://localhost:8080/";

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
  const handleAdminFundsAddingPage = () => {
    router.push("/AdminPages/adminFundsAddingPage");
  };
  const handleAdminPortsAddingPage = () => {
    router.push("/AdminPages/adminPortsAddingPage");
  };
  const handleAdminPortPage = () => {
    router.push("/AdminPages/adminPortPage");
  };
  const handleEmergencyInvestmentDashboard = () => {
    router.push("/EmergencyPages/emergencyInvestmentDashboard");
  };
  const handleAdminFundsManagement = () => {
    router.push("/AdminPages/adminFundsManagement");
  };
  const handleAdminPortsManagement = () => {
    router.push("/AdminPages/adminPortsManagement");
  };
  // const handleProfile = () => {
  //   router.push("/ProfileManagement/userProfile");
  // };
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
              onClick={handleAdminFundsAddingPage}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <SavingsIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="เพิ่มข้อมูลกองทุน" />
            </ListItemButton>
            <ListItemButton
              onClick={handleAdminPortsAddingPage}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <FlagIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="สร้างพอร์ตการลงทุน" />
            </ListItemButton>
            <ListItemButton
              onClick={handleAdminPortPage}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <ElderlyIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="จัดการการลงทุน" />
            </ListItemButton>
            <ListItemButton
              onClick={handleAdminFundsManagement}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <AttachMoneyIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="จัดการข้อมูลกองทุน" />
            </ListItemButton>
            <ListItemButton
              onClick={handleAdminPortsManagement}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:bg-opacity-75 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="จัดการข้อมูลพอร์ตการลงทุน" />
            </ListItemButton>
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default Sidebar;