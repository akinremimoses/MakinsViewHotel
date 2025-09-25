import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'> 
        <h2 className='text-7xl font-bold '>404</h2>
        <p>Page Not Found</p>
        <Link href={"/"} className='' >
        Go Home
        </Link>
    </div>
  )
}

export default NotFound