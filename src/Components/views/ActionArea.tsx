import React, { FC, useRef } from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { otherColor, otherGray2 } from '../../Constants/Constants';
import { Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

interface ActionAreaProps {
  zoomInRef: any;
  zoomOutRef: any;
}

const ActionArea: FC<ActionAreaProps> = (props) => {
  return (
    <div className="action-area flex flex-c other-gray-3">
      <div className="flex flex-r">
        <Button
          className="action-btn zoom-in other-gray-3"
          ref={props.zoomInRef}
        >
          <Add className="action-icon" />
        </Button>
        <Button
          className="action-btn zoom-out  other-gray-3"
          ref={props.zoomOutRef}
        >
          <Remove className="action-icon" />
        </Button>
      </div>
    </div>
  );
};

export default ActionArea;
