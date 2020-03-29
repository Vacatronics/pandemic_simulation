import React from 'react';
import { Layer, Stage, useStrictMode } from 'react-konva';
import { Simulation } from './Simulation';
import { Row, Col } from 'antd';


useStrictMode(false);

/**
 *
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 700,
      height: window.innerHeight - 50,
      x: 0,
      y: 0,
    }
  }

  componentDidMount() {
    this.setState({
      width: this.node.clientWidth,
      x: this.node.offsetLeft,
      y: this.node.offsetTop
    })
  }

  render() {
    return (
      <Col span={22}>
        <Row gutter={16} style={{marginTop: '10px'}}>
          <Col span={16}>
            <div width='100%' ref={node => this.node = node}>
              <Stage {...this.state}>
                <Layer>
                  <Simulation {...this.state}/>
                </Layer>
              </Stage>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default App;
