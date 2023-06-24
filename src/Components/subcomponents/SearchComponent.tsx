import { Search } from '@mui/icons-material';
import { InputAdornment, TextField, styled } from '@mui/material';
import React, { useContext } from 'react';
import { coordinate, MapContext, MapContextType } from '../Context/MapContext';
import { ISearchComponent } from '../../Constants/globals.interfaces';
import { Libraries, Loader } from '@googlemaps/js-api-loader';
import { loader } from '../views/MapArea';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import PlacesCard from './PlacesCard';
import { greenColor, poiArray } from '../../Constants/Constants';
import PointOfInterestComponent from './PointOfInterestComponent';

interface ILocationForm {
  input: string;
}

const SearchField = styled(TextField)({
  color: 'white',
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
    '& input': {
      color: 'white', // Set the font color to white
    },
  },
});

const SearchComponent = () => {
  const searchBoxRef = React.useRef<HTMLInputElement>();
  const { map, autoCompletePlaces, setAutoCompletePlaces } = React.useContext(
    MapContext
  ) as MapContextType;

  const [googleService, setGoogleService] = React.useState<typeof google>();
  const [autoCompleteService, setAutoCompleteService] =
    React.useState<Partial<google.maps.places.AutocompleteService>>();
  const [placesService, setPlacesService] =
    React.useState<Partial<google.maps.places.PlacesService>>();
  const { control, handleSubmit } = useForm<ILocationForm>();
  const onSubmit: SubmitHandler<ILocationForm> = async (data) => {
    try {
      if (googleService) {
        const { predictions } = await autoCompleteService.getPlacePredictions({
          input: data.input,
        });
        if (predictions?.[0] && placesService !== undefined) {
          if (map) {
            placesService?.getDetails(
              { placeId: predictions[0].place_id },
              (result, status) => {
                console.log(result);
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  result?.geometry
                ) {
                  const coordinates = result.geometry.location;
                  map.setCenter?.(coordinates);
                }
              }
            );
          }
        }
        setAutoCompletePlaces(predictions);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onPlaceSelect = (id: string) => {
    if (map) {
      placesService?.getDetails({ placeId: id }, (result, status) => {
        console.log(result);
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          result?.geometry
        ) {
          const coordinates = result.geometry.location;
          map.setCenter?.(coordinates);
        }
      });
    }
  };
  React.useEffect(() => {
    loader.load().then((google) => {
      setGoogleService(google);
      setAutoCompleteService(new google.maps.places.AutocompleteService());
      setPlacesService(
        new google.maps.places.PlacesService(document.createElement('div'))
      );
    });
  }, []);

  return (
    <div
      className=" general h-100 flex flex-c"
      style={{
        paddingLeft: '15px',
        paddingRight: '15px',
        paddingTop: '1.4rem',
      }}
    >
      <div
        className="title-area flex flex-r tertiary-color"
        style={{ width: '100%' }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Controller
            name="input"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <SearchField
                id="input-with-icon-textfield"
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search style={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                }}
                style={{ width: '100%' }}
                variant="outlined"
                color="secondary"
                onChange={onChange}
              />
            )}
          />
        </form>
      </div>
      {autoCompletePlaces?.length > 0 && (
        <div
          className="title-area flex flex-r tertiary-color"
          style={{ marginTop: '20px' }}
        >
          Search Results
        </div>
      )}

      <div>
        {autoCompletePlaces?.map((place) => {
          return (
            <PlacesCard
              key={`${place.place_id}`}
              {...place}
              onClick={() => {
                onPlaceSelect(place.place_id);
              }}
            />
          );
        })}
      </div>
      <div
        className="title-area flex flex-r tertiary-color"
        style={{ marginTop: '20px' }}
      >
        Places of Interest
      </div>
      <div
        className="title-area flex flex-r tertiary-color"
        style={{
          marginTop: '5px',
          fontWeight: '600',
          fontSize: '13px',
          marginBottom: '15px',
          color: greenColor,
        }}
      >
        Locations with confirmed small-scale mining activity
      </div>
      <div>
        {poiArray.map((place, index) => {
          return (
            <PointOfInterestComponent
              key={`${place.name}-${index}`}
              {...place}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchComponent;
