import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IInfoCardData } from '../../../Constants/globals.interfaces';
import { styled } from '@mui/material';

export const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    height: '300px',
  },
  height: '300px',
}));

export const CustomCardContent = styled(CardContent)(({ theme }) => ({}));

export const CustomCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)!important',
}));

export const CustomTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
}));

export default function InfoCard({ img, title, description }: IInfoCardData) {
  return (
    <Card sx={{ width: '100%', boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)' }}>
      <CustomCardMedia
        sx={{ height: 300 }}
        image={`images/${img}`}
        title={title}
      />
      <CustomCardContent>
        <CustomTypography
          gutterBottom
          variant="h5"
          sx={{ fontSize: '20px', fontWeight: '600' }}
        >
          {title}
        </CustomTypography>
        <CustomTypography
          sx={{ fontSize: '17px' }}
          variant="body2"
          color="#444444"
        >
          {description}
        </CustomTypography>
      </CustomCardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
