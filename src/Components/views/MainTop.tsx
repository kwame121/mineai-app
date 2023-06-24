import React, { useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ShareIcon from '@mui/icons-material/Share';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { MapContext, MapContextType } from '../Context/MapContext';
import { AppContext, AppContextType } from '../Context/Context';

const MainTop = () => {
  let { searchBoxRef } = useContext(MapContext) as MapContextType;
  let { currentViewState } = useContext(AppContext) as AppContextType;

  return (
    <div
      className="main-top w-100 primary-bg flex flex-r align-center-h"
      style={{
        height: '60px',
        position: 'absolute',
        top: '0',
        backgroundColor: 'transparent',
      }}
    >
      <div className="left primary-color">
        <span className="title-left" style={{ color: 'white' }}>
          {currentViewState == 'expanded' && 'Argus'}
        </span>
        <span className="title-right"></span>
      </div>
      {/* <div className="right flex">
        <div className="location-search-wrapper other-gray flex flex-r align-center-h">
          <div className="location-search">
            <input
              className="input-field other-gray "
              ref={searchBoxRef}
              placeholder="Enter a location..."
            ></input>
          </div>
          <div className="search-icon">
            <SearchIcon className="primary-color" />
          </div>
        </div>
        <div className="icon-bar flex flex-r align-center-h"></div>
      </div> */}
    </div>
  );
};

export default MainTop;
