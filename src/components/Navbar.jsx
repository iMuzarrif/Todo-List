import React from 'react'

function Navbar() {
  return (
    <nav>
        <ul className="flex justify-around bg-slate-600 py-2 ">
            <div className="log">
                <span>iTask</span>
            </div>
            <li><a href="#">Home </a></li>
            <li><a href="#">Your Task</a></li>
            <li><a href="#">Comtact Us</a></li>
            <li><a href="#">Theme</a></li>
        </ul>
    </nav>
  )
}

export default Navbar
