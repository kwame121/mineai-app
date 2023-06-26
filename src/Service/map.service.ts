import React from 'react';
import { CapturedLocations } from '../Components/views/MapArea';
import axios from 'axios';
import { IReportParams } from '../Constants/globals.interfaces';
import { AppContext, AppContextType } from '../Components/Context/Context';
import {
  SettingsContext,
  SettingsContextType,
} from '../Components/Context/SettingsContext';
import { coordinate } from '../Components/Context/MapContext';

export const useGetMap = () => {
  const [reportLoading, setReportLoading] = React.useState(false);
  const [showPredictionModal, setShowPredictionModal] = React.useState(false);
  const [googleService, setGoogleService] = React.useState<typeof google>();
  const { showToast } = React.useContext(AppContext) as AppContextType;
  const { changeDetailsModal, showingDetailsModal } = React.useContext(
    SettingsContext
  ) as SettingsContextType;
  const getCertainty = (predictionObject: any): number => {
    let argMax =
      predictionObject.argmax !== undefined ? predictionObject.argmax : -1;
    console.log(argMax);
    if (argMax !== -1) {
      if (predictionObject !== null || predictionObject !== undefined) {
        let certainty = predictionObject.data
          ? (Object.values(predictionObject.data) as unknown as number[])[
              argMax
            ]
          : 0;
        if (certainty == undefined) {
          return 0;
        }
        return certainty * 100;
      }
    }
    return 0;
  };
  const reportImage = async (params: IReportParams) => {
    try {
      setReportLoading(true);
      await axios.post(`http://34.173.177.184:5001/report`, {
        latitude: params.coordinates.lat.toString(),
        longitude: params.coordinates.lng.toString(),
        type: params.type,
      });
      showToast({
        message: 'Image Reported',
        placement: { vertical: 'top', horizontal: 'center' },
        type: 'success',
      });
    } catch (e) {
      console.log(e);
      showToast({
        message: 'Reporting failed, contact server master',
        placement: { vertical: 'top', horizontal: 'center' },
        type: 'error',
      });
    } finally {
      setReportLoading(false);
      changeDetailsModal(false);
    }
  };

  function calculateBounds(center: coordinate, side: number) {
    try {
      let north = google.maps.geometry.spherical
        .computeOffset(center, side / 2, 0)
        .lat();
      let south = google.maps.geometry.spherical
        .computeOffset(center, side / 2, 180)
        .lat();
      let east = google.maps.geometry.spherical
        .computeOffset(center, side / 2, 90)
        .lng();
      let west = google.maps.geometry.spherical
        .computeOffset(center, side / 2, 270)
        .lng();

      return new google.maps.LatLngBounds(
        new google.maps.LatLng(south, west),
        new google.maps.LatLng(north, east)
      );
    } catch (e) {
      console.log(e);
    }
  }
  return {
    reportLoading,
    showPredictionModal,
    googleService,
    setGoogleService,
    calculateBounds,
    setShowPredictionModal,
    setReportLoading,
    getCertainty,
    reportImage,
  };
};
