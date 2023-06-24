import React, { memo, FC, RefObject } from 'react';

interface BtnProps {
  buttonRef: any;
  captureLocation: any;
}

const Capturebtn: FC<BtnProps> = (props) => {
  return (
    <div
      className="capture-btn button-default button-slanted"
      ref={props.buttonRef}
    >
      <span
        className="button-slanted-content"
        style={{
          fontFamily: 'inherit',
          textTransform: 'initial',
          fontWeight: '700',
          fontSize: '20px',
        }}
      >
        Capture
      </span>
    </div>
  );
};

export default memo(Capturebtn);
