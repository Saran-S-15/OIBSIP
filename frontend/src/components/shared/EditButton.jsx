import { Pencil } from 'lucide-react'
import React, { useState } from 'react'

const EditButton = ({ item, setEdit, setSauceId, formik }) => {

    const handleEdit = async (item) => {
        setEdit(true);
        setSauceId(item._id);
        formik.setValues(item);
    }
    return (
        <button onClick={() => handleEdit(item)} className='btn btn-sm btn-outline btn-warning hover:scale-110'>
            <Pencil size={16} />
        </button>
    )
}

export default EditButton