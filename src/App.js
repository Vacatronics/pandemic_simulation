import React from 'react';
import { Layer, Stage } from 'react-konva';
import { Simulation } from './Simulation';
import { Row, Col } from 'antd';

function App() {
  return (
    <Col span={22}>
      <Row gutter={16}>
        <Col span={16}>
          <Stage width={700} height={700}>
            <Layer>
              <Simulation />
            </Layer>
          </Stage>
        </Col>
      </Row>
    </Col>
  );
}

export default App;
