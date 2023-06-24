export const returnPredictionString = (string: string) => {
  return string == 'positive' ? 'Mining' : 'Non-Mining';
};

// export const getRectangleSize = (zoom:number) => {
//   switch(zoom){
//     case 10
//   }
// }

export const getOverlayOpacity = (certainty: number) => {
  switch (true) {
    case certainty > 89:
      return 0.89;
    case certainty < 80:
      return (certainty / 100) * 0.75;
    case certainty >= 80:
      return certainty / 100;
  }
};
