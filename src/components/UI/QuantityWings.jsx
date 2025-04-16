import React from 'react'

const QuantityWings = ({Wings}) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row cursor-pointer gap text-sm xl:text-lg justify-center text-center  items-center bg-orange-400 text-white ml-1 mt-1 p-0.5 xl:p-1 shadow rounded-md">
    <p>{Wings}</p>
    <img className='w-5 xl:w-8' src="./img/alasIcon.webp" alt="" />
  </div>
  )
}

export default QuantityWings