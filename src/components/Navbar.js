import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarInnerContainer,
  NavbarExtendedContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from '../styles/Navbar.style'
import LogoImg from '../assets/logo.webp'
import { useState } from 'react'

const Navbar = ({ token, logout }) => {
  const [extendNavbar, setExtendNavbar] = useState(false)

  // Inner container wraps left and right container to prevent them from being on top of each other and are displayed as columns.
  // We need another div (ExtendedContainer) below so the ones on top of each other are inner and extended.
  // ExtendedContainer is also used for handling the smaller sized menu of the navbar

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLink to="/">Books</NavbarLink>
          <NavbarLink to="/authors">Authors</NavbarLink>
          {!token ? (
            <NavbarLink to="/login">Login</NavbarLink>
          ) : (
            <>
              <NavbarLink to="/create">Add Book</NavbarLink>
              <NavbarLink to="/recommend">Recommended</NavbarLink>
              <NavbarLink to="/login" onClick={logout}>
                Logout
              </NavbarLink>
            </>
          )}
          <OpenLinksButton onClick={() => setExtendNavbar((curr) => !curr)}>
            {' '}
            {extendNavbar ? <>&#10005;</> : <>&#8801;</>}{' '}
          </OpenLinksButton>
        </LeftContainer>
        <RightContainer>
          <Logo src={LogoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer
          onClick={() => setExtendNavbar((curr) => !curr)}
        >
          <>
            <NavbarLinkExtended to="/">Books</NavbarLinkExtended>
            <NavbarLinkExtended to="/authors">Authors</NavbarLinkExtended>
          </>
          {!token ? (
            <NavbarLinkExtended to="/login">Login</NavbarLinkExtended>
          ) : (
            <>
              <NavbarLinkExtended to="/create">Add Book</NavbarLinkExtended>
              <NavbarLinkExtended to="/recommend">
                Recommended
              </NavbarLinkExtended>
              <NavbarLinkExtended to="/login" onClick={logout}>
                Logout
              </NavbarLinkExtended>
            </>
          )}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  )
}

export default Navbar
