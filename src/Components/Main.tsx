import React, {useState} from 'react';
import Sidebar from './includes/Sidebar';
import MainApp from './views/MainApp';
import { AppContext} from './Context/Context';


const AppProvider: React.FC<React.ReactNode>= ({children}) => 
{
    const [selectedView,setSelectedView] = useState(0);

    const changeView = (view:number) => {
        setSelectedView(view);
    }
    
    return (
        <AppContext.Provider value = {{selectedView,changeView}}>
            {children}
        </AppContext.Provider>
    )
}



const Main = () => {

  return (
    <div className="app-main h-100 w-100 flex flex-r">
        <AppProvider>
            <Sidebar/>
            <MainApp/>
        </AppProvider>
    </div>
  )
}

export default Main;