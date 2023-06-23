import {useContext} from 'react'
import MainModal from '../../../components/Reusables/MainModal'
import FormComponent from '../../../components/Reusables/FormComponent'
import { tolabels } from '../../../constants/Constants'
import ExtrasContext from '../../../Context/ExtrasContext'
import { Button } from 'antd'

const AddClient = () => {
    const {clientmodalisopen,setClientmodalIsOpen}=useContext(ExtrasContext)
  return (
    <div>
        <MainModal isOpen={clientmodalisopen} setIsOpen={setClientmodalIsOpen} title={"Add Client"}>

            <FormComponent tolabels={tolabels} origin="Add Client"/>
            <Button className='flex flex-row-reverse border-blue-500 bg-blue-500 text-white'>Add</Button>
        </MainModal>
    </div>
  )
}

export default AddClient