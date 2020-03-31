import React from 'react';
import { Layer, Stage, useStrictMode } from 'react-konva';
import { Simulation } from './Simulation';
import { Row, Col } from 'antd';
import { Settings } from './Settings';


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
      number: 10,
    }
  }

  componentDidMount() {
    this.setState({
      width: this.node.clientWidth,
      x: this.node.offsetLeft,
      y: this.node.offsetTop
    })
  }

  onFormSubmitted = (values) => {
    this.setState({...values});
  }

  render() {
    return (
      <Col span={22}>
        <Row gutter={16} style={{ marginTop: '10px' }}>
          <Col span={6}>
            <Settings {...this.state} onFinished={this.onFormSubmitted}/>
          </Col>
          <Col span={16}>
            <div width='100%' ref={node => this.node = node}>
              <Stage {...this.state}>
                <Layer>
                  <Simulation {...this.state} />
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
