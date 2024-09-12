import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'

const Badge = ({children, styleInfo}) => {
    const colorKey = {
        Fashion: "dark",
        Travel: "dark",
        Food: "dark",
        Technology: "dark",
        Music: "dark"
    }
  return (
    <h5 style={styleInfo}>
        <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  )
}

export default Badge