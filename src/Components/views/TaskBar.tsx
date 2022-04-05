import React , {FC, useContext, useState} from 'react'
import General from '../subcomponents/General';
import Settings from '../subcomponents/Settings';
import { AppContext, AppContextType } from '../Context/Context';

const TaskBar= ()  => {

const {selectedView} = useContext(AppContext) as AppContextType;

  // placeholder to simulate ui...
return (
    <div className="taskbar flex flex-c secondary-bg w-100">
        {selectedView==0?<General/>:<Settings/>}
    </div>
  )
}

export default TaskBar;