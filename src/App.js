import React from 'react';
import { useStrictMode } from 'react-konva';
import { Simulation } from './Simulation';
import { Settings } from './Settings';
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
      settings: {
        number: 10,
        infectionRadius: 4,
        infectionProb: 20,
        infectionLethality: 3,
        speed: 1.0
      },
      running: false
    }
  }

  onFormSubmitted = (values) => {
    this.setState({running: false, settings: {...values}});
    setTimeout(() => {
      this.setState({running: true})
    }, 100);
  }

  onPlay = (running, values) => {
    if (values !== null) {
      this.setState({running: running, settings: {...values}})
    } else {
      this.setState({running})
    }
  }

  render() {
    return (
      <Col span={22}>
        <Row gutter={16} style={{ marginTop: '50px' }}>
          <Col span={6}>
            <Settings 
              {...this.state} 
              onFinished={this.onFormSubmitted} 
              onPlay={this.onPlay}
            />
          </Col>
          <Col span={16}>
            <Simulation {...this.state} />
          </Col>
        </Row>
      </Col>
    );
  }
}

export default App;
