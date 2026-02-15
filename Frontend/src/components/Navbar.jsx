import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <nav style={{padding:15, background:"#0b5ed7", color:"white"}}>
      <Link to="/" style={{color:"white", marginRight:20}}>Home</Link>
      <Link to="/book" style={{color:"white", marginRight:20}}>Book</Link>
      <Link to="/user" style={{color:"white", marginRight:20}}>User</Link>
      <Link to="/driver" style={{color:"white", marginRight:20}}>Driver</Link>
      <Link to="/admin" style={{color:"white"}}>Admin</Link>
    </nav>
  );
}