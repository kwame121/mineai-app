import React, { useContext } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { AppContext, AppContextType } from '../Context/Context';
import classNames from 'classnames';
import { Button } from '@mui/material';
import { otherColor } from '../../Constants/Constants';
import SearchIcon from '@mui/icons-material/Search';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import { Tooltip } from '@mui/material';

const Sidebar = () => {
  const { changeView, selectedView, currentViewState, setCurrentViewState } =
    useContext(AppContext) as AppContextType;

  return (
    <div
      className="sidebar h-100 flex flex-c primary-bg"
      style={{
        width: '56px',
        boxShadow: '0 1px 2px rgba(0,0,0,.3) , 0 1px 3px 1px rgba(0,0,0,.15)',
        zIndex: '1300',
      }}
    >
      <div className="sidebar-body w-100 flex flex-c align-center-h">
        <div className="sidebar-item flex flex-c align-center-h">
          <Tooltip
            title={
              currentViewState == 'split' ? 'Close Sidebar' : 'Expand Sidebar'
            }
            placement={'right'}
          >
            <Button
              onClick={() => {
                if (currentViewState == 'expanded') {
                  changeView(4);
                  setCurrentViewState('split');
                } else {
                  setCurrentViewState('expanded');
                  changeView(9);
                }
              }}
              style={{ color: 'white' }}
            >
              {currentViewState == 'split' ? (
                <CloseIcon style={{ fontSize: '24px' }} />
              ) : (
                <MenuIcon style={{ fontSize: '24px' }} />
              )}
            </Button>
          </Tooltip>
        </div>
        <div
          className="sidebar-item flex flex-c align-center-h"
          onClick={() => {
            if (selectedView == 4 && currentViewState == 'split') {
              setCurrentViewState('expanded');
              changeView(9);
            } else {
              changeView(4);
              setCurrentViewState('split');
            }
          }}
        >
          <Tooltip title={'Home'} placement={'right'}>
            <Button>
              <HomeIcon
                className={classNames({
                  'sidebar-icon': true,
                  'other-color': selectedView === 4,
                  'primary-color': selectedView !== 4,
                })}
                style={{ fontSize: '24px' }}
              />
            </Button>
          </Tooltip>
        </div>
        <div
          className="sidebar-item flex flex-c align-center-h"
          onClick={() => {
            if (selectedView == 0 && currentViewState == 'split') {
              setCurrentViewState('expanded');
              changeView(9);
            } else {
              changeView(0);
              setCurrentViewState('split');
            }
          }}
        >
          <Tooltip title={'Search'} placement={'right'}>
            <Button>
              <SearchIcon
                className={classNames({
                  'sidebar-icon': true,
                  'other-color': selectedView === 0,
                  'primary-color': selectedView !== 0,
                })}
                style={{ fontSize: '24px' }}
              />
            </Button>
          </Tooltip>
        </div>

        <div
          className="sidebar-item flex flex-c align-center-h "
          onClick={() => {
            if (selectedView == 1 && currentViewState == 'split') {
              setCurrentViewState('expanded');
              changeView(9);
            } else {
              changeView(1);
              setCurrentViewState('split');
            }
          }}
        >
          <Tooltip title={'Predictions'} placement={'right'}>
            <Button>
              <AnalyticsIcon
                style={{ fontSize: '24px' }}
                className={classNames({
                  'sidebar-icon': true,
                  'other-color': selectedView === 1,
                  'primary-color': selectedView !== 1,
                })}
              />
            </Button>
          </Tooltip>
        </div>
        <div
          className="sidebar-item flex flex-c align-center-h"
          onClick={() => {
            if (selectedView == 2 && currentViewState == 'split') {
              setCurrentViewState('expanded');
              changeView(9);
            } else {
              changeView(2);
              setCurrentViewState('split');
            }
          }}
        >
          <Tooltip title={'Settings'} placement={'right'}>
            <Button>
              <SettingsIcon
                style={{ fontSize: '24px' }}
                className={classNames({
                  'sidebar-icon': true,
                  'other-color': selectedView === 2,
                  'primary-color': selectedView !== 2,
                })}
              />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
