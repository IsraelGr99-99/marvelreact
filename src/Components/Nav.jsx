import {Link,useNavigate} from 'react-router-dom'
import storage from '../Storage/storage'

const Nav = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-white bg-danger'>
      <div className='container-fluid'>
        <img src="public/logo.png" alt="" width="150" height="60"/>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' 
        data-bs-target='#nav' aria-controls='navbarSupportedContent'>
          <span className='navbar-toggler-icon'></span>

        </button>
      </div>
    </nav>
  )
}

export default Nav