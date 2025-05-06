import React from 'react'

const Input = ({ Icon, ...props }) => {
    return (
        <div className='relative'>
            <input {...props} />
            {Icon && <Icon className='absolute left-3 top-3.5 text-gray-400' size={20} />}
        </div>
    )
}

export default Input