import React, { FC, useRef } from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';


interface ActionAreaProps 
{
  zoomInRef:any,
  zoomOutRef:any
}



const ActionArea: FC<ActionAreaProps> = (props) => {



  return (
    <div className="action-area flex flex-c other-gray-3">
        <div className="action-btn zoom-in other-gray-3" >
            <ZoomInIcon ref = {props.zoomInRef} className="action-icon"/>
        </div> 
        <div className ="action-btn zoom-out  other-gray-3">
            <ZoomOutIcon ref = {props.zoomOutRef} className="action-icon"/>
        </div>
    </div>
  )
}

export default ActionArea