// @flow
import React, { useState } from "react"
import NavigationBar from "@kiwicom/orbit-components/lib/NavigationBar"
import Drawer from "@kiwicom/orbit-components/lib/Drawer"

import NavbarContent from "./NavbarContent"
import SidebarContent from "./SidebarContent"

const NavbarWithSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <NavigationBar onMenuOpen={() => setIsSidebarOpen(true)} dataTest="NavigationBar">
        <NavbarContent />
      </NavigationBar>
      <Drawer shown={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <SidebarContent closeSidebar={() => setIsSidebarOpen(false)} />
      </Drawer>
    </>
  )
}

export default NavbarWithSidebar
