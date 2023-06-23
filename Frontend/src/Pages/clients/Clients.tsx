import { Button } from 'antd'
import {useContext} from 'react'
import ExtrasContext from '../../Context/ExtrasContext'

const Clients = () => {
  const {setClientmodalIsOpen}=useContext(ExtrasContext)
  return (
    <div className='flex'>
      <div className='flex items-center justify-between w-full m-10'>
        <h2 className='text-2xl font-bold'>Clients</h2>
        <Button size='large' onClick={()=>{setClientmodalIsOpen(true)}} className='border-blue-500 bg-blue-500 text-white'>Add Client</Button>
      </div>
    </div>
  )
}

export default Clients