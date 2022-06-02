import { Link } from 'react-router-dom'

const Navbar = ({ token, logout }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to='/'>
        Books
      </Link>
      <Link style={padding} to='/authors'>
        Authors
      </Link>
      {!token ? (
        <Link style={padding} to='/login'>
          Login
        </Link>
      ) : (
        <>
          <Link style={padding} to='/create'>
            Add Book
          </Link>
          <Link style={padding} to='/recommend'>
            Recommended
          </Link>
          <Link style={padding} to='/login' onClick={logout}>
            Logout
          </Link>
        </>
      )}
    </div>
  )
}

export default Navbar
