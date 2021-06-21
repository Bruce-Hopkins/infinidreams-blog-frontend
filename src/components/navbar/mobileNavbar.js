import React, {useEffect, useState} from 'react'

import Logo from "../../images/InFINIDREAMS.png"
import SidebarContext from '../context/SidebarContext'

function MobileNavbar (){

    return (
        <section className="mobile-menu-container">
            <div className="mobile-menu-group">
                <div className="mobile-logo-container">
                    <a href="http://www.infinidream.net/"> <img alt="Logo" className="logo" src={Logo}/> </a>
                </div>
            </div>
        </section>
    )
}

export default MobileNavbar