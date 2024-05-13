import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'

const App = () => {
  return (
    <div className='admin'>
      <Navbar/>
      <Admin/>
    </div>
  )
}

export default App