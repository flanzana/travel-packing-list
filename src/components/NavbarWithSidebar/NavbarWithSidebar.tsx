import { useState, ReactNode } from "react"
import NavigationBar from "@kiwicom/orbit-components/lib/NavigationBar"
import Drawer from "@kiwicom/orbit-components/lib/Drawer"
import useMediaQuery from "@kiwicom/orbit-components/lib/hooks/useMediaQuery"

import NavbarContent from "./NavbarContent"
import SidebarContent from "./SidebarContent"
import BottomNavbar from "../BottomNavbar"

const NavbarWithSidebar = (): ReactNode => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isLargeMobile } = useMediaQuery()

  // not visible on screen wider than 575px
  const isBottomNavbarVisible = !isLargeMobile

  return (
    <>
      <NavigationBar
        // hide hamburger icon because it is visible in bottom navbar
        {...(!isBottomNavbarVisible && { onMenuOpen: () => setIsSidebarOpen(true) })}
        hideOnScroll={false}
      >
        <NavbarContent />
      </NavigationBar>
      {isBottomNavbarVisible && (
        <BottomNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      )}
      <Drawer shown={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} dataTest="Sidebar">
        <SidebarContent closeSidebar={() => setIsSidebarOpen(false)} />
      </Drawer>
    </>
  )
}

export default NavbarWithSidebar
