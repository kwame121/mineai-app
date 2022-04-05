import React, { FC, RefObject } from 'react';


interface BtnProps {
    buttonRef:any,
    captureLocation:any;
}

const Capturebtn:FC<BtnProps> = (props) => {

  return (
    <div className="capture-btn button-default button-slanted" ref = {props.buttonRef} >
        <span className="button-slanted-content">Capture</span>
    </div>
  )
}

export default Capturebtn;