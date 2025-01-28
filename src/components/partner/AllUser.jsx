import React from 'react'
import HeaderComp from '../helpercomp/HeaderComp'

const AllUser = ({ setSelectedCategory }) => {
  return (
    <div className="partner-main-container">
    <HeaderComp title={"All Users"} setSelectedCategory={setSelectedCategory} />
  </div>
  )
}

export default AllUser