import React from 'react'

export default function RowItemCustom(props) {
    return <div className={props.cl ? `row ${props.cl}` : "row"}>        
            {props.children}            
    </div>
}