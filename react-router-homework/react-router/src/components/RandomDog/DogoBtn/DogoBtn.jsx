import React from 'react'

export const DogoBtn = (props) => {
    return (
        <button className='dogoBtn' onClick={props.onClick}>
            {props.lable}
        </button>
    )
}
