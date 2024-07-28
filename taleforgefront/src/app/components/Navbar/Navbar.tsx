import Link from 'next/link'
import React from 'react'
import AvatarPlaceHolder from '../AvatarPlaceHolder'
const Navbar = () => {
  return (
<header className="fixed top-0 left-0 right-0 z-50">
  <div className="navbar bg-base-100 px-10"> 
    <div className="flex-1">
      <Link className="btn btn-ghost text-xl pl-10" href="/"> 
        TaleForge
      </Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-10"> 
        <li><Link href='/buildBook'>Build Book</Link></li>
        <li><Link href="">Library</Link></li>
        <li><Link href='pricing'>Pricing</Link></li>
        <li><Link href='login'>Login</Link></li>
        <li><Link href="signup">Sign Up</Link></li>
        <li>
        <AvatarPlaceHolder />
          {/* <details>
            <summary>Parent</summary>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li><Link href='/buildBook'>Build Book</Link></li>
              <li><a>Library</a></li>
              <li><Link href="signup">Pricing</Link></li>
            </ul>
          </details> */}
        </li>
      </ul>
    </div>
  </div>
</header>

  )
}

export default Navbar