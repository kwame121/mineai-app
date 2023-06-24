import React, { memo } from 'react';
import { MapContext, MapContextType } from '../Context/MapContext';

interface OverlayProps {
  default: number;
  buttonRef: any;
}

const Overlay: React.FunctionComponent<OverlayProps> = (props) => {
  const { map } = React.useContext(MapContext) as MapContextType;

  const [showZoomLevel, setShowZoomLevel] = React.useState(false);
  const [overlayZoomLevel, setOverlayZoomLevel] = React.useState(
    map?.getZoom()
  );

  const handleScroll = (event) => {
    if (map) {
      // Check the deltaY value to determine the scroll direction
      const isScrollingUp = event.deltaY < 0;

      // Get the current zoom level of the map
      const currentZoom = map.getZoom();

      // Define the desired zoom increment
      const zoomIncrement = 1;

      // Calculate the new zoom level based on the scroll direction
      const newZoom = isScrollingUp
        ? currentZoom + zoomIncrement
        : currentZoom - zoomIncrement;

      // Limit the zoom level within a desired range (e.g., 1 to 20)
      const minZoom = 1;
      const maxZoom = 20;
      const finalZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));

      // Set the new zoom level on the map
      map.setZoom(finalZoom);
      setShowZoomLevel(true);
    }
  };

  React.useEffect(() => {
    // Attach the onScroll event listener to the overlay div
    props?.buttonRef?.current.addEventListener('wheel', handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      props?.buttonRef?.current.removeEventListener('wheel', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    setOverlayZoomLevel(map?.getZoom());
  }, [map?.getZoom()]);

  return (
    <div
      className="overlay"
      ref={props.buttonRef}
      onMouseEnter={() => {
        setShowZoomLevel(true);
      }}
      onMouseLeave={() => {
        setShowZoomLevel(false);
      }}
    >
      {showZoomLevel && (
        <div className={'zoom-level-number'}>{map.getZoom()}</div>
      )}
    </div>
  );
};

export default memo(Overlay);
