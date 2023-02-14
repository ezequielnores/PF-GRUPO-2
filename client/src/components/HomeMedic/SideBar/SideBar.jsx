import { Link } from "react-router-dom";

const SideBar =()=>{

return(

    <div>
         <button>
            <Link to="/">Back to LandingPage</Link>
        </button>
         <button>
            <Link to="/HomeMedic/Profile">Profile</Link>
        </button>
         <button>
            <Link to="/HomeMedic/Agenda">Agenda</Link>
        </button>
         <button>
            <Link to="/HomeMedic/MedicalEmergency">Medical Emergency</Link>
        </button>
         <button>
            <Link to="/HomeMedic/Reviews">Reviews</Link>
        </button>
    </div>
    )
}

export default SideBar;