import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import './Scanning.scss';

export default function Scanning() {
    const history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            history.push("/result")
        },5000)
    }, [history])
    return (
        <div className="scanning">
            <div className="heart-wrapper" style={{backgroundImage:`url(/images/heart.png)`}}>
                <hr />
            </div>
            <p>Scanning...</p>
        </div>
    )
}
