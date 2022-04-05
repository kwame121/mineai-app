import React from 'react';
import TextTruncate from 'react-text-truncate'; 

const description = "Tontokrom is a small town located in the Amansie South District in the Ashanti Region of Ghana.[1][2][3] It is mostly known for its gold and has recently been noted for the menace of illegal mining popularly called galamsey.[4] (Wikipedia)";
const background = '/images/mining.jpg'

const PoiCard = () => {
  return (
    <div className="poi-card flex flex-c other-gray">
        <div className="poi-top flex flex-r">
          <div className="left primary-color">Point of Interest</div>
          <div className="right"></div>
        </div>
        <div className="poi-image" style={{background:`url(${background})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>

        </div>
        <div className="poi-content flex flex-c">
          <div className="header flex flex-r">
            <div className="left">
                Tontokrom, Ghana
            </div>
            <div className="right">

            </div>
          </div>

          <div className="body flex flex-c">
              <div className="description other-gray-color-2">
              <TextTruncate
                line={5}
                element="span"
                truncateText="…"
                text={description}
            />
              </div>
          </div>
        </div>
    </div>
  )
}

export default PoiCard