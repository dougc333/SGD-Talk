import { useState } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import useMediaQuery from "../hooks/useMediaQuery"


const Navbar = ({selectedPage, setSelectedPage})=>{
  const [isMenuToggled, setIsMenuToggled] = useState(false)
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)')

  return (
    <nav className = {`z-40 w-full fixed top-0 py-6`}>
      <div className="flex items-center justify-between mx=auto w-5/6">
        <h4 className="font-playfair text-3xl font-bold">JE</h4>
        {/* DESKTOP NAV */}
        {isAboveSmallScreens ? (

           
        ):()}
      </div>
    </nav>
  )

}