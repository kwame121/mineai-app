import React, { FC } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';

const ActionArea2 = () => {
  return (
    <div className="action-area-2 flex flex-r align-center-v other-gray">
      <div className="left flex align-center-h">
        <div className="area-item other-gray-color-3">Actions</div>
      </div>
      <div className="right flex align-center-h">
        <div className="area-item">
          <DeleteForeverIcon className="icon other-gray-color-2" />
        </div>
        <div className="area-item">
          <SaveIcon className="icon other-gray-color-2" />
        </div>
      </div>
    </div>
  );
};

export default ActionArea2;
