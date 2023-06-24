import React, { useEffect, useState, useRef, useContext } from 'react';
import PoiCard from './PoiCard';
import ActionArea2 from './ActionArea2';
import ActionArea from './ActionArea';
import Overlay from './Overlay';
import { Loader } from '@googlemaps/js-api-loader';
import { coordinate, MapContext, MapContextType } from '../Context/MapContext';
import {
  SettingsContext,
  SettingsContextType,
} from '../Context/SettingsContext';
import axios from 'axios';
import CaptureBtn from '../subcomponents/Capturebtn';
import {
  geolocationUrl,
  greenColor,
  otherGray2,
} from '../../Constants/Constants';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { AppContext, AppContextType } from '../Context/Context';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { getOverlayOpacity } from '../subcomponents/subcomponents.service';
import { useGetMap } from '../../Service/map.service';
import { IReportParams } from '../../Constants/globals.interfaces';
import * as Mui from '@mui/material';
const api_key: string | undefined = process.env.REACT_APP_API_KEY;
export const loader = new Loader({
  apiKey: api_key ? api_key : '',
  version: 'weekly',
  libraries: ['places', 'drawing', 'geometry'],
});
export interface geolocation {
  locality: string;
  country: string;
}

export interface CapturedLocations {
  coordinates: coordinate;
  prediction: any;
  predictionString: string;
  zoom: number;
  geolocation: geolocation;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#0E0E0E',
  boxShadow: 24,
  p: 5,
  borderRadius: 5,
};

const CustomButton = ({ ...props }: React.CSSProperties) =>
  Mui.styled(Button)({
    textTransform: 'initial',
    color: 'white',
    padding: '10px',
    ...props,
  });

const FalsePositiveButton = CustomButton({
  backgroundColor: otherGray2,
  marginBottom: '10px',
});
const FalseNegativeButton = CustomButton({
  backgroundColor: otherGray2,
});

const MapArea = () => {
  let {
    center,
    zoom,
    poi,
    mapRef,
    searchBoxRef,
    setMap,
    changeCenter,
    changeGeoLocation,
    changeZoom,
  } = useContext(MapContext) as MapContextType;
  let {
    overlayColor,
    controlScheme,
    capturedLocations,
    filterLowCertaintyPredictions,
    filterHighCertaintyPredictions,
    overlaysVisible,
    changeCapturedLocations,
    selectedLocation,
    changeSelectedLocation,
    showingDetailsModal,
    changeDetailsModal,
  } = useContext(SettingsContext) as SettingsContextType;
  const { selectedView, currentViewState, showToast } = useContext(
    AppContext
  ) as AppContextType;
  const {
    reportLoading,
    showPredictionModal,
    setShowPredictionModal,
    setReportLoading,
    getCertainty,
    reportImage,
  } = useGetMap();
  let buttonRef = useRef<HTMLDivElement>();
  let zoomInRef = useRef<HTMLDivElement>();
  let zoomOutRef = useRef<HTMLDivElement>();
  const [predictionModal, setPredictionModal] = useState(false);
  const [currentPrediction, setCurrentPrediction] =
    useState<CapturedLocations>();

  const [selectedPoi, setSelectedPoi] = useState<number>(0);

  let map: any = null;
  let markers: any = [];
  let captureLocation: any | undefined;

  React.useEffect(() => {
    loader
      .load()
      .then((google: any) => {
        console.log('map rerendered');
        const _mapRef = mapRef.current as HTMLDivElement | HTMLElement;
        map = new google.maps.Map(_mapRef, {
          center: center,
          zoom: zoom,
          mapTypeId: 'satellite',
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        });
        setMap(map);
        console.log(searchBoxRef, 131111);

        const _searchBoxRef = searchBoxRef.current as HTMLInputElement;
        const searchbox = new google.maps.places.SearchBox(_searchBoxRef);

        console.log(searchbox, 132);
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

        async function fetchGeolocationData(location: coordinate) {
          try {
            let request = await axios.post(
              geolocationUrl +
                `json?latlng=${location.lat},${location.lng}&key=${process.env.REACT_APP_API_KEY}`
            );
            let result = request?.data?.results[0];
            let addressComponents = result?.address_components;
            if (addressComponents) {
              let { long_name: locality } = addressComponents?.[1];
              let { long_name: country } = addressComponents?.[4];
              // let coordinate:coordinate = {lat:location.lat,lng:location.lng};
              let geolocationObj = { locality: locality, country: country };
              return geolocationObj;
            }
            return { locality: 'Unknown', country: 'Unknown' };
          } catch (e) {
            return { locality: 'Unknown', country: 'Unknown' };
          }

          // let geolocation_final: CapturedLocations = {coordinates:coordinate,geolocation:geolocationObj,prediction:location.prediction,predictionString:location.predictionString,zoom:location.zoom};
        }

        function zoomHandler(zoom: number, action: string) {
          if (action === 'zoom-in') {
            if (zoom < 21) {
              zoom = zoom + 1;
              map.setZoom(map.getZoom() + 1);
            }
          } else if (action === 'zoom-out') {
            if (zoom > 0) {
              map.setZoom(map.getZoom() - 1);
            }
          }

          return;
        }

        //load all the overlays

        captureLocation = async () => {
          try {
            if (controlScheme == 'box') {
              //get all the relevant map data and display loader...
              const size: number = 250;
              let _centre = map.getCenter();
              let _lat = _centre.lat();
              let _lng = _centre.lng();
              let _zoom = map.getZoom();

              if (_zoom < 16) {
                showToast({
                  placement: { horizontal: 'center', vertical: 'top' },
                  type: 'error',
                  message:
                    'Zoom level is too low to capture image. Please zoom in closer.',
                });
                return;
              }
              var imgUrl =
                'https://maps.googleapis.com/maps/api/staticmap?center=' +
                _lat +
                ',' +
                _lng +
                '&zoom=' +
                _zoom +
                '&size=' +
                size +
                'x' +
                size +
                '&maptype=satellite&key=' +
                process.env.REACT_APP_API_KEY;
              let capturedCoordinates: coordinate = { lat: _lat, lng: _lng };
              let currentPrediction: CapturedLocations = {
                coordinates: capturedCoordinates,
                geolocation: { country: '', locality: '' },
                prediction: {},
                predictionString: 'No Prediction',
                zoom: _zoom,
              };
              setCurrentPrediction(currentPrediction);
              setPredictionModal(true);

              //run prediction api call and update ui with results
              let request = await axios.post(
                `http://34.173.177.184:5001/predict`,
                {
                  imgUrl,
                }
              );
              let { argMax, data } = request.data;
              let prediction = { argmax: argMax, data: data };
              let predictionString = argMax === 0 ? 'positive' : 'negative';
              let geolocation = await fetchGeolocationData({
                lat: _lat,
                lng: _lng,
              });
              let _capturedLocation: CapturedLocations = {
                coordinates: capturedCoordinates,
                prediction: prediction,
                predictionString: predictionString,
                zoom: zoom,
                geolocation: geolocation,
              };
              changeCenter(capturedCoordinates);
              // map.setCenter({
              //   lat: capturedCoordinates.lat,
              //   lng: capturedCoordinates.lng,
              // });
              changeZoom(map.getZoom());
              changeCapturedLocations(_capturedLocation, map.getZoom());
              setPredictionModal(false);
              changeSelectedLocation(_capturedLocation, map.getZoom());
              changeDetailsModal(true);
              console.log(argMax, data);
              if (_capturedLocation.zoom == 16) {
                showToast({
                  message:
                    'Captures at this zoom level may sometimes be inaccurate',
                  type: 'info',
                  placement: { horizontal: 'center', vertical: 'top' },
                });
              }
            } else if (controlScheme === 'drawing') {
              //do the drawing code stuff...
            }
          } catch (e) {
            console.log(e);
            setPredictionModal(false);
            changeDetailsModal(false);
          }
        };

        // end of function declarations.......

        if (capturedLocations.length > 0 && overlaysVisible == true) {
          capturedLocations.forEach((location: CapturedLocations, index) => {
            if (location.predictionString == 'positive') {
              let { coordinates } = location;

              let rectangleSize =
                location.zoom == 20
                  ? 37
                  : 37 * Math.pow(2, Math.abs(20 - location.zoom));
              let bounds = calculateBounds(coordinates, rectangleSize);

              let rectangle = new google.maps.Rectangle({
                strokeColor: overlayColor,
                strokeOpacity: getOverlayOpacity(
                  getCertainty(location.prediction)
                ),
                strokeWeight: 2,
                fillColor: overlayColor,
                fillOpacity: getOverlayOpacity(
                  getCertainty(location.prediction)
                ),
                map,
                bounds: bounds,
              });

              rectangle.addListener('click', function () {
                changeSelectedLocation(location, location?.zoom);
                changeDetailsModal(true);
              });
            }
          });
        }

        if (buttonRef.current != undefined) {
          buttonRef.current.onclick = async () => {
            await captureLocation();
          };
        }

        if (zoomInRef.current != undefined && zoomOutRef.current != undefined) {
          zoomInRef.current.onclick = () => {
            let zoom = map.getZoom();
            zoomHandler(zoom, 'zoom-in');
          };

          zoomOutRef.current.onclick = () => {
            let zoom = map.getZoom();
            zoomHandler(zoom, 'zoom-out');
          };
        }

        // _searchBoxRef.addEventListener('keydown', (e: KeyboardEvent) => {
        //   if (e.code == 'Enter') {
        //     e.stopImmediatePropagation(); //to stop weird freezing issue with enter press...
        //   }
        // });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [zoom, capturedLocations, overlayColor, searchBoxRef, overlaysVisible]);

  return (
    <div
      className="MapArea flex align-center-h align-center-v w-100"
      style={{
        width: '100%',
      }}
    >
      <Modal
        open={showingDetailsModal}
        onClose={() => {
          changeDetailsModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ border: '0px' }}
        className="remove-outline modal-predict"
      >
        <Box sx={style} className="remove-outline">
          <div
            className="prediction-modal flex flex-c align-center-h align-center-v"
            style={{ marginBottom: '20px' }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',

                paddingBottom: '5px',
              }}
            >
              <Button
                style={{ order: '1', marginLeft: 'auto' }}
                onClick={() => {
                  changeDetailsModal(!showingDetailsModal);
                }}
              >
                <CloseIcon style={{ fontSize: '35px', color: 'white' }} />
              </Button>
            </div>
            <div style={{ display: 'flex' }}>
              <div
                className="left pred-image"
                style={{
                  backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${selectedLocation?.coordinates.lat},${selectedLocation?.coordinates.lng}&zoom=${selectedLocation?.zoom}&size=250x250&maptype=satellite&key=${process.env.REACT_APP_API_KEY})`,
                }}
              ></div>
              <div className="right flex flex-r ">
                <div className="prediction-status flex">
                  <div className="left">
                    <div className="certainty other-color-2 flex align-center-v flex-c">
                      {getCertainty(selectedLocation.prediction)?.toFixed(2)}
                      <span
                        className="certainty-sub"
                        style={{ fontSize: '0.9rem' }}
                      >
                        Certainty
                      </span>
                    </div>
                    <div className="top other-color-2">
                      {selectedLocation.predictionString === 'positive'
                        ? 'Mining'
                        : 'Non Mining'}
                    </div>
                    <div className="bottom other-color-2">
                      {selectedLocation.geolocation.locality},{' '}
                      {selectedLocation.geolocation.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-c"
              style={{ marginTop: '20px', width: '100%' }}
            >
              {reportLoading && (
                <CircularProgress style={{ color: '#478966' }} />
              )}
              {!reportLoading && (
                <>
                  <FalsePositiveButton
                    onClick={() => {
                      let params: IReportParams = selectedLocation;
                      params.type = 'false_positive';
                      reportImage(params);
                    }}
                  >
                    Report False Positive
                  </FalsePositiveButton>
                  <FalseNegativeButton
                    onClick={() => {
                      let params: IReportParams = selectedLocation;
                      params.type = 'false_negative';
                      reportImage(params);
                    }}
                  >
                    Report False Negative
                  </FalseNegativeButton>
                </>
              )}
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={predictionModal}
        onClose={() => {
          // setPredictionModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ border: '0px' }}
        className="remove-outline modal-predict"
      >
        <Box sx={style} className="remove-outline">
          <div className="prediction-modal flex align-center-h align-center-v">
            <div
              className="left pred-image"
              style={{
                backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${currentPrediction?.coordinates.lat},${currentPrediction?.coordinates.lng}&zoom=${currentPrediction?.zoom}&size=250x250&maptype=satellite&key=${process.env.REACT_APP_API_KEY})`,
              }}
            ></div>
            <div className="right flex flex-r ">
              <div className="prediction-status flex">
                <div className="left">
                  <div className="top other-color-2">Predicting...</div>
                  <div className="bottom other-color-2">Please Wait</div>
                </div>
                <div className="right flex flex-c">
                  <div>
                    <CircularProgress style={{ color: '#478966' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="map w-100 h-100 " ref={mapRef}></div>
      {/* <PoiCard /> */}
      <ActionArea zoomInRef={zoomInRef} zoomOutRef={zoomOutRef} />
      {/* <ActionArea2 /> */}
      <Overlay default={0} buttonRef={buttonRef} />
      {/* <CaptureBtn buttonRef={buttonRef} captureLocation={captureLocation} /> */}
    </div>
  );
};

export default MapArea;
