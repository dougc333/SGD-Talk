import {Link} from './Link';
import {Link2} from './Link2';

export  const Navbar = ()=>{
  return(
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>  
        </li>
        <li>
          <Link to="/foo">Foo</Link>
        </li>
        <li>
        <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
