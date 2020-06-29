import React from 'react'
import Navigation from '../components/Navigation';

const Default: React.FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <div>
        {children}
      </div>
    </>
  )
}

export default Default