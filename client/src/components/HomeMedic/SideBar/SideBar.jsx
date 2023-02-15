 import { Link } from "react-router-dom";
 import List from '@mui/material/List';
 import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ReviewsIcon from '@mui/icons-material/Reviews';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
function SideBar({ open }) {
    return (
      <List>
        <br/>
         <Link to="/HomeMedic" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
            <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Back" />
          </ListItem>
        </Link>
        
        <Link to="/HomeMedic/Profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
            <AccessibilityNewIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
       
        <Link to="/HomeMedic/Agenda" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
            <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Agenda" />
          </ListItem>
        </Link>
        
        <Link to="/HomeMedic/MedicalEmergency" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
            <MedicalServicesIcon />
            </ListItemIcon>
            <ListItemText primary="MedicalEmergency" />
          </ListItem>
        </Link>
       
        <Link to="/HomeMedic/Reviews" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
            <ReviewsIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItem>
        </Link>
        <br/>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
            <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </Link>
      </List>
    );
  }

  export default SideBar;
  