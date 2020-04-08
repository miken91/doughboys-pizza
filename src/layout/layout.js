import React from "react"

import Header from "../components/header"


const Layout = ({ children }) => {
    return (
    <>
      <Header className="header"/>
      {children}
    </>
  )
}

export default Layout