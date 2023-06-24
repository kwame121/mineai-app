import React from 'react';
import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  styled,
} from '@mui/material';
import { Stepper } from '@mui/material';
import {
  HowToSteps,
  greenColor,
  otherColor,
  otherGray2,
} from '../../Constants/Constants';
import steps from 'antd/lib/steps';
import { MapContext, MapContextType } from '../Context/MapContext';

const CustomStepper = ({ ...props }: React.CSSProperties) =>
  styled(Stepper)({
    ...props,
  });

const CustomStep = ({ ...props }: React.CSSProperties) =>
  styled(Step)({ ...props });

const CustomStepLabel = ({ ...props }: React.CSSProperties) =>
  styled(StepLabel)({ color: 'white', ...props });

const CustomStepDescription = ({ ...props }: React.CSSProperties) => {
  return styled(StepContent)({ ...props });
};

const CustomButton = ({ ...props }: Partial<React.CSSProperties>) => {
  return styled(Button)({
    ...props,
    textTransform: 'initial',
    '&:hover': {
      backgroundColor: '#141414',
    },
  });
};

const StepImage = styled('img')({
  width: '100%',
  marginBottom: '10px',
});

const HowToStepperWrapper = CustomStepper({});
const HowToStep = CustomStep({});
const HowToStepLabel = CustomStepLabel({});
const HowToStepDescription = CustomStepDescription({});
const NextButton = CustomButton({
  backgroundColor: greenColor,
});
const BackButton = CustomButton({
  color: greenColor,
});

const HowToStepper = () => {
  const { stepperStage, setStepperStage } = React.useContext(
    MapContext
  ) as MapContextType;
  const [currentStep, setCurrentStep] = React.useState(stepperStage);
  const handleNext = () => {
    setCurrentStep((currentStep) => currentStep + 1);
    setStepperStage(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((currentStep) => currentStep - 1);
    setStepperStage(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setStepperStage(0);
  };

  return (
    <>
      {' '}
      <HowToStepperWrapper activeStep={currentStep} orientation="vertical">
        {HowToSteps.map((step, index) => {
          return (
            <HowToStep key={step.label}>
              <HowToStepLabel
                style={{ color: 'white' }}
                componentsProps={{ label: { style: { color: 'white' } } }}
                StepIconProps={{ style: { color: greenColor } }}
              >
                {step.label}
              </HowToStepLabel>
              <HowToStepDescription>
                {step?.img && <StepImage src={`images/${step?.img}`} />}
                {step.description}

                <p>
                  {step?.notes?.map((note) => {
                    return <>{note?.description}</>;
                  })}
                </p>
                <Box sx={{ mb: 2, mt: 1 }}>
                  <div>
                    <NextButton
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === HowToSteps.length - 1 ? 'Finish' : 'Continue'}
                    </NextButton>
                    <BackButton
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </BackButton>
                  </div>
                </Box>
              </HowToStepDescription>
            </HowToStep>
          );
        })}
      </HowToStepperWrapper>
      {currentStep === HowToSteps.length && (
        <BackButton onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
          Start Over
        </BackButton>
      )}
    </>
  );
};

export default HowToStepper;
