import React from 'react';
import { Grid, styled, Button } from '@mui/material';
import { Typography } from 'antd';
import Navbar from './subcomponents/Landing/Navbar';
import Footer from './subcomponents/Landing/Footer';
import { InfoCardData, greenColor } from '../Constants/Constants';
import { useNavigate } from 'react-router';
import InfoCard from './subcomponents/Landing/InfoCard';

const LandingMain = styled('main')({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
});

const LandingTextWrapper = ({ ...props }: Partial<React.CSSProperties>) =>
  styled(Typography)({
    color: 'black',
    fontSize: '14px',
    fontFamily: 'inherit',
    ...props,
  });

const LandingContainer = styled(Grid)({
  //..some styles..
});

const HeaderContainer = styled(Grid)({
  backgroundColor: 'black',
  minHeight: '700px',
  display: 'flex',
  flexDirection: 'column',
});

const HeaderContent = styled(Grid)(({ theme }) => ({
  minHeight: 'calc(800px - 4rem)',
  width: '100%',
  backgroundColor: '#0E0E0E',
  [theme.breakpoints.up('sm')]: {
    minHeight: 'calc(800px - 5rem)',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const HeaderContentColumns = styled(Grid)(({ theme }) => ({
  padding: '25px',
}));

const ExplainerContainer = styled(Grid)(({ theme }) => ({
  minHeight: '500px',
  [theme.breakpoints.up('sm')]: {
    minHeight: '600px',
  },
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '50px',
  paddingRight: '50px',
}));

const ExplainerContent = styled(Grid)(({ theme }) => ({
  minHeight: '500px',
  [theme.breakpoints.up('sm')]: {
    minHeight: '600px',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ExplainerContentColumns = styled(Grid)(({ theme }) => ({
  padding: '30px',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: '80px',
    paddingRight: '80px',
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: '50px',
    paddingRight: '50px',
  },
}));

const GalleryExplainerContent = styled(Grid)(({ theme }) => ({
  minHeight: '600px',
  [theme.breakpoints.up('sm')]: {
    minHeight: '600px',
    paddingTop: '100px',
    paddingBottom: '100px',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const GalleryExplainerContentColumns = styled(Grid)(({ theme }) => ({
  padding: '30px',
  [theme.breakpoints.up('lg')]: {
    height: '100%',
  },
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: '2.625rem',
  color: 'white',
  [theme.breakpoints.up('sm')]: {
    fontSize: '3.4375rem',
  },
}));

const TitleText2 = styled(Typography)(({ theme }) => ({
  fontSize: '2.225rem',
  color: 'white',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.4rem',
  },
}));

export const SubtitleText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  marginTop: '2rem',
  color: 'white',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
}));

export const SubtitleText2 = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  marginTop: '2rem',
  color: '#444444',
  lineHeight: '30px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.3rem',
  },
}));

export const StartButton = styled(Button)(({ theme }) => ({
  borderColor: greenColor,
  color: greenColor,
  textTransform: 'initial',
  backgroundColor: 'transparent',
  border: `1px solid ${greenColor}`,
  '&:hover': {
    backgroundColor: greenColor,
    color: 'white',
  },
  [theme.breakpoints.up('sm')]: {
    minWidth: '250px',
    fontSize: '1rem',
  },
}));

const TitleImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  [theme.breakpoints.up('sm')]: {},
}));

const Landing = () => {
  const navigate = useNavigate();
  return (
    <LandingMain>
      <HeaderContainer container>
        <Navbar />
        <HeaderContent container>
          <HeaderContentColumns
            item
            xs={12}
            md={6}
            style={{ paddingRight: '5rem' }}
          >
            <TitleText>Introducing ARGUS</TitleText>
            <SubtitleText style={{ marginBottom: '50px', marginTop: '50px' }}>
              ARGUS is a convolutional neural network specifically developed to
              detect signs of small-scale mining deforestation. It utilizes
              advanced image processing techniques and deep learning algorithms
              to analyze satellite imagery and identify areas affected by
              small-scale mining activities that contribute to deforestation.
            </SubtitleText>
            <div>
              <StartButton
                onClick={() => {
                  navigate('/app');
                }}
              >
                Try ARGUS!
              </StartButton>
            </div>
          </HeaderContentColumns>
          <HeaderContentColumns item xs={12} md={6}>
            <TitleImage src={'images/argos.jpg'} />
          </HeaderContentColumns>
        </HeaderContent>
      </HeaderContainer>

      <Grid container>
        <GalleryExplainerContent
          style={{ paddingRight: '50px', paddingLeft: '50px' }}
          container
        >
          {InfoCardData.map((infoCard, index) => {
            return (
              <GalleryExplainerContentColumns xs={12} md={6} lg={3}>
                <InfoCard {...infoCard} key={`${index}-${infoCard.title}`} />
              </GalleryExplainerContentColumns>
            );
          })}
        </GalleryExplainerContent>
      </Grid>

      <ExplainerContainer container>
        <ExplainerContent container>
          <ExplainerContentColumns xs={12} md={12}>
            <TitleText2 style={{ color: 'black' }}>Background</TitleText2>

            <SubtitleText2>
              Ghana, my home country, and much of the world faces an existential
              threat to her natural resources. Rampant deforestation, caused by
              activities like small-scale mining are putting our forest reserves
              on the brink, and this has always been a matter of grave concern
              to me. It needs to stop. Either we harness our resources
              sustainably, or we dont do so at all.
              <p>
                This web application is meant to serve as a proof of concept,
                demonstrating the capabilities of AI in this domain, and
                possibly hinting at what the future of conservation in Ghana
                might (or should) look like if we want to stand any chance at
                fixing the massive environmental crisis which currently besets
                us.
              </p>
              <p>
                In embarking on this web application project, I want to
                acknowledge that while AI holds great promise for addressing
                environmental challenges, it also has its limitations. As a sole
                developer, I recognize that there are currently numerous
                instances where the AI model produces false positives or false
                negatives in identifying and addressing deforestation. However,
                it's important to remember that this is just the beginning, and
                I am dedicated to continuously improving and refining the model
                to minimize these errors. With optimism and determination, I
                believe that together we can pave the way for a brighter and
                greener future for Ghana and our planet. Let's keep working
                towards sustainable practices and a thriving ecosystem.
              </p>
              <p>
                In the future, I wish to add change detection and other such
                features to the mix. It may take a while because I work
                full-time though, and this is mostly a hobby. I know the big
                boys at NASA probably have a billion dollar solution hidden in
                the basement with the aliens, but that's why we do personal
                projects right? To build crappier versions of already existing
                tech? Anyways, bye.
              </p>
            </SubtitleText2>
          </ExplainerContentColumns>
        </ExplainerContent>
      </ExplainerContainer>

      <ExplainerContainer container>
        <ExplainerContent container>
          <ExplainerContentColumns xs={12} md={6}>
            <TitleImage src={'images/argus_demo.gif'} />
          </ExplainerContentColumns>
          <ExplainerContentColumns xs={12} md={6}>
            <TitleText2 style={{ color: 'black' }}>
              What does ARGUS do?
            </TitleText2>
            <SubtitleText2>
              ARGUS employs state-of-the-art computer vision models and
              large-scale datasets in detecting and monitoring signs of
              deforestation caused by small-scale mining operations. Its goal is
              to aid environmental agencies, researchers, and policymakers in
              understanding the extent and impact of small-scale mining
              activities on forest ecosystems.
            </SubtitleText2>
          </ExplainerContentColumns>
        </ExplainerContent>
      </ExplainerContainer>

      <ExplainerContainer container>
        <ExplainerContent container>
          <ExplainerContentColumns xs={12} md={6}>
            <TitleText2 style={{ color: 'black' }}>
              Why are tools like ARGUS important?
            </TitleText2>
            <SubtitleText2>
              By leveraging its deep learning capabilities, ARGUS aims to learn
              and provide valuable insights and actionable information to combat
              illegal mining, promote sustainable practices, and protect
              vulnerable forest regions.
            </SubtitleText2>
          </ExplainerContentColumns>
          <ExplainerContentColumns xs={12} md={6}>
            <TitleImage src={'images/mining3.jpg'} />
          </ExplainerContentColumns>
        </ExplainerContent>
      </ExplainerContainer>

      <ExplainerContainer container style={{ paddingBottom: '50px' }}>
        <ExplainerContent container>
          <ExplainerContentColumns xs={12} md={8}>
            <TitleImage src={'images/rainforest5.jpg'} />
          </ExplainerContentColumns>
          <ExplainerContentColumns xs={12} md={4}>
            <TitleText2 style={{ color: 'black' }}>
              How can I improve ARGUS?
            </TitleText2>
            <SubtitleText2>
              Simple answer? By using the app. The app contains features which
              allow for the reporting of innacurate predictions. Doing so allows
              us to identify problem areas, and greatly improves the process of
              model optimization.
            </SubtitleText2>
          </ExplainerContentColumns>
        </ExplainerContent>
      </ExplainerContainer>
      <Footer />
    </LandingMain>
  );
};

export default Landing;
