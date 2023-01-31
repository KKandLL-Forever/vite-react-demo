import React, { useEffect } from "react";
import { Scene, RasterLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';


function L7Map () {

  useEffect(() => {
    const scene = new Scene({
      id: 'map',
      map: new Map({
        center: [116.673842, 27.405974],
        zoom: 18,
      }),
    });
  
    const url1 = 'https://t0.tianditu.gov.cn/img_w/wmts?tk=b72aa81ac2b3cae941d1eb213499e15e&';

    const layer1 = new RasterLayer({
      zIndex: 1,
    }).source(url1, {
      parser: {
        type: 'rasterTile',
        tileSize: 256,
        wmtsOptions: {
          layer: 'img',
          tileMatrixset: 'w',
          format: 'tiles',
        },
      },
    });
  
    scene.on('loaded', () => {
      scene.addLayer(layer1);
    });
  },[])
  
  return (
    <div id='map' style={{minHeight: '800px',justifyContent: 'center',position: 'relative'}}>
    
    </div>
  );
}

export default L7Map;
