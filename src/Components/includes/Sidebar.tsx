import React, { useContext } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppContext, AppContextType } from '../Context/Context';
import classNames from 'classnames';


const Sidebar = () => {

const {changeView,selectedView} = useContext(AppContext) as AppContextType;


  return (
    <div className="sidebar h-100 flex flex-c primary-bg">
        <div className="sidebar-top w-100  flex flex-c align-center-v align-center-h tertiary-bg">
            <div className="sidebar-image-area">
                <img style={{width:'2rem'}} src='images/logo.svg'></img>
            </div>
        </div>
        <div className="sidebar-body w-100 flex flex-c align-center-h">
            <div className="sidebar-item flex flex-c align-center-h ">
                <PublicIcon onClick={()=>{changeView(0)}} style={{fontSize:'1.7rem'}} className={classNames({'sidebar-icon':true,'other-color':selectedView===0,'primary-color':selectedView!==0})}/>
            </div>
            <div className="sidebar-item flex flex-c align-center-h">
                <SettingsIcon onClick={()=>{changeView(1)}} style={{fontSize:'1.7rem'}}  className={classNames({'sidebar-icon':true,'other-color':selectedView===1,'primary-color':selectedView!==1})}/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;