import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  styled,
} from '@mui/material';
import { IInfoAccordion } from '../../Constants/globals.interfaces';
import { greenColor, otherColor } from '../../Constants/Constants';
import { MapContext, MapContextType } from '../Context/MapContext';

const InfoAccordionWrapper = styled(Accordion)({
  border: `2px solid gray`,
  padding: '10px',
  borderRadius: '10px',
  backgroundColor: 'black',
  marginBottom: '15px',
  '&:hover': {
    background: '#00000070',
    cursor: 'pointer',
  },
});

const AccordionHeader = styled(AccordionSummary)({
  '.&Mui-expanded': {
    minHeight: 'unset!important',
  },
});

const DescriptionImage = styled('img')({
  width: '100%',
  marginBottom: '10px',
});

const AccordionHeaderText = ({ ...props }: React.CSSProperties) =>
  styled(Typography)({
    color: 'gray',
    fontFamily: 'inherit!important',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...props,
  });

const CustomAccordionDetails = styled(AccordionDetails)({
  paddingTop: '10px',
  color: 'white',
  flexDirection: 'column',
  lineHeight: '20px',
});

const InfoAccordionHeaderText = AccordionHeaderText({
  color: 'gray',
  flexDirection: 'column',
});

const InfoAccordionSubTitle = AccordionHeaderText({
  fontSize: '14px',
  fontWeight: '600',
  color: otherColor,
});

const InfoAccordionTitle = AccordionHeaderText({
  flexDirection: 'row',
});

const InfoAccordionBase = ({
  children,
  expandable,
  defaultOpen,
  title,
  subtitle,
  description,
  descriptionImage,
  index,
}: IInfoAccordion) => {
  const { aboutPageState, setAboutPageState } = React.useContext(
    MapContext
  ) as MapContextType;
  const [expanded, setExpanded] = React.useState<boolean>(
    defaultOpen !== undefined ? defaultOpen : true
  );

  const handleAccordionChange = () => {
    if (expandable) {
      setExpanded(!expanded);
      let _aboutPageState = aboutPageState;
      _aboutPageState[index].open = !expanded;
      setAboutPageState(_aboutPageState);
    }
  };
  return (
    <InfoAccordionWrapper
      className="info-base-accordion"
      expanded={expanded}
      onChange={handleAccordionChange}
      style={{ borderColor: expanded ? greenColor : 'gray' }}
    >
      <AccordionHeader>
        <InfoAccordionHeaderText>
          <InfoAccordionTitle style={{ color: expanded ? 'white' : 'inherit' }}>
            {title}
          </InfoAccordionTitle>
          <InfoAccordionSubTitle
            style={{ color: expanded ? otherColor : 'inherit' }}
          >
            {subtitle}
          </InfoAccordionSubTitle>
        </InfoAccordionHeaderText>
      </AccordionHeader>
      <CustomAccordionDetails>
        {descriptionImage && (
          <DescriptionImage src={`images/${descriptionImage}`} />
        )}
        {children || description}
      </CustomAccordionDetails>
    </InfoAccordionWrapper>
  );
};

export default InfoAccordionBase;
