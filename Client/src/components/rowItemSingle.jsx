import React from 'react'

export default function RowItemSingle(props) {
    return <div className={props.cl ? `row ${props.cl}` : "row"}>        
        <div className="column">
            {props.children}            
        </div>       
    </div>
}