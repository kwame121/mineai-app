import React from 'react';
import SpaIcon from '@mui/icons-material/Spa';
import { styled } from '@mui/material';
import { FAQItems } from '../../Constants/Constants';
import InfoAccordionBase from './InfoAccordionBase';
import HowToStepper from './HowToStepper';
import { MapContext, MapContextType } from '../Context/MapContext';

export const AboutHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: '15px',
  paddingLeft: '15px',
  marginBottom: '20px',
});

const AboutBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '15px',
  paddingRight: '15px',
});

const About = () => {
  const { aboutPageState } = React.useContext(MapContext) as MapContextType;
  return (
    <div className="general flex flex-c h-100 w-100" style={{}}>
      <AboutHeader className="title flex other-color-2 flex-r">
        <SpaIcon style={{ fontSize: '25px', color: '#478966 ' }} />
        <div
          style={{
            fontFamily: "'moon'",
            fontSize: '24px',
            fontWeight: '800',
            marginLeft: '15px',
          }}
        >
          ARGUS
        </div>
      </AboutHeader>
      <AboutBody>
        <InfoAccordionBase
          title="How to use ARGUS"
          defaultOpen={true}
          subtitle="Hello there! Before you do anything, check out this brief explainer on how to use ARGUS"
          expandable
        >
          <HowToStepper />
        </InfoAccordionBase>
        {FAQItems.map((FAQ, index) => {
          return (
            <InfoAccordionBase
              title={FAQ?.title || ''}
              description={FAQ.description}
              expandable={true}
              defaultOpen={aboutPageState?.[index]?.open == true ? true : false}
              descriptionImage={FAQ.descriptionImage}
              index={index}
              key={`${index}-${FAQ.title}`}
            />
          );
        })}
      </AboutBody>
    </div>
  );
};

export default About;
