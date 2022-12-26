import React from 'react'
import RowItemSingle from './rowItemSingle'

export default function PageContent(props) {
    return <div className="content">
        <div className='p-20'>
            <RowItemSingle>
                <h3>{props.title}</h3>
            </RowItemSingle>
            {props.children}
        </div>
    </div>
}