import React from 'react'
import {Link} from "react-router-dom"
import MainTable from '../../components/MainTable/MainTable'
const Invoices = () => {
  return (
    <div>
        <Link to="new">new Invoice</Link>
        <MainTable/>
    </div>
  )
}

export default Invoices