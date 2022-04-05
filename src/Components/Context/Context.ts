import { createContext,useState } from "react";


export type AppContextType = {
    selectedView : number;
    changeView: (view:number) => void;
}

export const AppContext = createContext <AppContextType | null>(null);

