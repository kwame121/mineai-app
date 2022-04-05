import React, { FC, useContext } from 'react';
import Switch from '@mui/material/Switch';
import CheckIcon from '@mui/icons-material/Check';
import { SettingsContext, SettingsContextType } from '../Context/SettingsContext';
import {colorArray} from '../../Constants/Constants';
import classNames from 'classnames';
import { styled } from '@mui/material/styles';




interface colorProps {
    colorCode:string,
    overlayColor:string,
    changeOverLay : (colorCode:string) => void
}

function shadeColor(color:string, percent:number) 
{

    var R:any = parseInt(color.substring(1,3),16);
    var G:any = parseInt(color.substring(3,5),16);
    var B:any = parseInt(color.substring(5,7),16);

    R = parseInt((R * (100 + percent) / 100).toString());
    G = parseInt((G * (100 + percent) / 100).toString());
    B = parseInt((B * (100 + percent) / 100).toString());

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;


}


const colorBoxStyle = (selected:boolean,colorCode:string) => {

    if (selected)
    {
        return  {
            'mozBoxShadow': `inset 0 0 10px ${shadeColor(colorCode,-100)}`,
            'webkitBoxShadow': `inset 0 0 10px ${shadeColor(colorCode,-100)}`,
            'box-shadow': `inset 0 0 10px ${shadeColor(colorCode,-100)}`,
            'backgroundColor':`${colorCode}`,
            'border':'4px solid white'
        }
    }
     
    return {'backgroundColor':`${colorCode}`,
            'border':`4px solid ${shadeColor(colorCode,-50)}`
            }
    

}

const ColorBox:FC <colorProps> = ({colorCode,overlayColor,changeOverLay}): JSX.Element => 
{

    let className = classNames({"color-box ":true,"selected-color inner-shadow":colorCode===overlayColor})

    return (
        <div className={className} style={colorBoxStyle(colorCode===overlayColor,colorCode)} onClick={()=>{changeOverLay(colorCode)}}>   
        </div>
    )
}



const IOSSwitch = styled((props:any)=> (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: "#478966",
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#0E0E0E' : '#0E0E0E',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

const Settings = () => {

  let {overlayColor,controlScheme,unit,changeOverlay,changeScheme,changeUnit} = useContext(SettingsContext) as SettingsContextType;  

  const handleChange = (e:any,type:string) => 
  {
    if (e.target.checked)
    {
        changeScheme(type);
    }
  }
  
  return (
    <div className="settings flex flex-c  w-100 h-100">
        <div className="title-area flex flex-r tertiary-color">
            <div>Settings</div>
        </div>
        <div className="overlay-card flex flex-c other-gray">
            <div className="title flex flex-r w-100 other-color-2">
                <div>Overlay Color</div>
            </div>
            <div className="color-options flex flex-r">
                {colorArray.map((color,index)=>{
                    return <ColorBox overlayColor={overlayColor} colorCode={color} changeOverLay={changeOverlay}/>
                })}
            </div>
        </div>
        <div className="control-scheme flex flex-c other-gray-2">
                <div className="title flex flex-r other-color-2">
                    <div>Control Scheme</div>
                </div>
                <div className="options-area flex flex-c other-color-2">
                    <div className="option flex flex-r align-center-h">
                        <div className="left">Capture Button (Default)</div>
                        <div className="right">
                        <IOSSwitch 
                        checked = {controlScheme==="box"}
                        onChange={(e:any)=>{handleChange(e,"box")}}
                        /></div>
                    </div>
                    <div className="option flex flex-r align-center-h">
                        <div className="left">Click Capture</div>
                        <div className="right">
                            <IOSSwitch
                            checked = {controlScheme==="click"}
                            onChange={(e:any)=>{handleChange(e,"click")}}
                            />
                        </div>
                    </div>
                    <div className="option flex flex-r align-center-h">
                        <div className="left">Draw Capture</div>
                        <div className="right">
                            <IOSSwitch 
                            checked={controlScheme==="draw"}
                            onChange={(e:any)=>{handleChange(e,"draw")}}
                            />
                        </div>
                    </div>
                </div>

        </div>
        <div className="other-settings flex flex-c other-gray-2">
            <div className="title flex flex-r other-color-2">
                <div className="left">Other Settings</div>
            </div>
            <div className="options-area flex flex-c other-color-2">
                <div className="option flex flex-r align-center-h">
                    <div className="left">
                        Unit of Measurement
                    </div>
                    <div className="right flex flex-r">
                        <div onClick={()=>{changeUnit('metric')}}  className={classNames({'unit-btn tertiary-bg':unit==='metric',"unit-btn secondary-bg other-color-2":unit!=='metric'})}>
                            M
                        </div>
                        <div onClick={()=>{changeUnit('feet')}} className={classNames({'unit-btn tertiary-bg':unit==='feet',"unit-btn secondary-bg other-color-2":unit!=='feet'})} >
                            F
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Settings