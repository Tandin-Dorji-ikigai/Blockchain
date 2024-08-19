import React, { Fragment } from 'react';
import {BallTriangle } from 'react-loader-spinner'

import "./css/loader.css";
export default function Loader() {
    return (
        <Fragment>
            <div className='loader-triangle'>
                <BallTriangle
                    height={130}
                    width={130}
                    radius={5}
                    color="#01D28E"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                />
            </div>
        </Fragment>
    )
}