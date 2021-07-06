import React from "react";
import Column from "./Column";
import Column25 from "./Column25";
import Column50 from "./Column50";
import Row from "./Row";

const ProductsForShop = ({ glasses, phrases, greeting = false }) => {
  let gIdx = 0;
  let pIdx = 0;

  return (
    <div>
      <Row margin={6}>
        <Column50 glass={glasses[gIdx++]} />

        <Column25
          glass={glasses[gIdx++]}
          paddingTop={true}
          alignSelf="flex-end"
        />
        <Column25 alignSelf="flex-start">
          <div className="w-full font-medium font-times text-5xl text-gray-700 flex flex-col">
            <div className="py-4 w-full flex justify-start">5</div>
            <div className="py-4 w-full flex justify-center">x</div>
            <div className="py-4 w-full flex justify-end">5</div>
          </div>
        </Column25>
      </Row>

      {greeting && (
        <Row margin={6} directionColumn={true}>
          <div className="text-center font-times font-medium text-6xl py-12 tracking-widest">
            Hej Friend!
          </div>

          <Column25
            glass={glasses[gIdx++]}
            paddingTop={false}
            alignSelf="center"
          />
        </Row>
      )}

      <Row margin={6}>
        <Column50 alignSelf="center">
          <div
            dangerouslySetInnerHTML={{ __html: phrases[pIdx++] }}
            className="font-times text-base text-center tracking-widest"
          ></div>
        </Column50>
        <Column50 glass={glasses[gIdx++]} />
      </Row>

      <Row margin={6}>
        <Column50 glass={glasses[gIdx++]} />

        <Column25
          glass={glasses[gIdx++]}
          paddingTop={true}
          alignSelf="flex-end"
        />
        <Column25
          glass={glasses[gIdx++]}
          paddingTop={true}
          alignSelf="flex-end"
        />
      </Row>

      <Row margin={8}>
        <Column50 alignSelf="center">
          <div
            dangerouslySetInnerHTML={{ __html: phrases[pIdx++] }}
            className="font-times text-base text-center tracking-widest"
          ></div>
        </Column50>
      </Row>

      <Row margin={6}>
        <Column50 glass={glasses[gIdx++]} />

        <Column50
          glass={glasses[gIdx++]}
          paddingTop={true}
          alignSelf="flex-end"
        />
      </Row>
      <Row margin={6}>
        <Column50 alignSelf="center">
          <div
            dangerouslySetInnerHTML={{ __html: phrases[pIdx++] }}
            className="font-times text-base text-center tracking-widest"
          ></div>
        </Column50>
        <Column flexBasis={25} />
        <Column25 glass={glasses[gIdx++]} />
      </Row>
      <Row margin={6}>
        <Column50 glass={glasses[gIdx++]} />
        <Column flexBasis={25} />
        <Column25 glass={glasses[gIdx++]} alignSelf="center" />
      </Row>
    </div>
  );
};

export default ProductsForShop;
