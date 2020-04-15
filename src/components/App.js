import React from 'react';
import { useStrictMode } from 'react-konva';
import { Simulation } from './Simulation';
import { Settings } from './Settings';
import { Row, Col, Typography, Button, Drawer, Layout, Tooltip } from 'antd';
import { PauseCircleFilled, PlayCircleOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';


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
        number: 100,
        infectionRadius: 4,
        infectionProb: 20,
        infectionLethality: 5,
        infectionDays: 15,
        infectionSymptomDays: [5, 20],
        speed: 2.0,
        count: 0
      },
      running: false,
      settingsVisible: false
    }

    this.formRef = React.createRef();
  }

  onPlay = (running) => this.setState({running: running})

  onRestart = () => {
    const settings = {...this.state.settings};
    settings.count = settings.count + 1;
    this.setState({running: false, settings});
    setTimeout(() => this.setState({running: true}), 100);
  }
  
  showDrawer = () => this.setState({settingsVisible: true})

  closeDrawer = () => this.setState({settingsVisible: false})

  toggleDrawer = () => this.setState({settingsVisible: !this.state.settingsVisible})

  onSave = () => {
    const values = this.formRef.current.getFieldsValue();
    this.setState({settingsVisible: false, settings: {...values}})
  }


  render() {
    return (
      <Layout>
        <Layout.Header>
          <Row>
            <Col span={6}>
              <Tooltip title='Configurações'>
                <Button icon={<SettingOutlined />} style={{ marginRight: '10px' }} onClick={this.toggleDrawer} />
              </Tooltip>

              <Tooltip title='Reiniciar'>
                <Button icon={<ReloadOutlined />} style={{ marginRight: '10px' }} onClick={this.onRestart}/>
              </Tooltip>

              {
                this.state.running ? (
                  <Tooltip title='Parar simulação'>
                    <Button icon={<PauseCircleFilled />} onClick={() => this.onPlay(false)}/>
                  </Tooltip>
                ) : (
                    <Tooltip title='Iniciar simulação'>
                      <Button icon={<PlayCircleOutlined />} onClick={() => this.onPlay(true)}/>
                    </Tooltip>
                  )
              }

            </Col>
            <Col span={12} style={{textAlign: 'center'}}>
              <Typography.Title style={{marginTop: '10px'}}>
                Simulação Pandemia
              </Typography.Title>
            </Col>            

            <Col span={6}>
            </Col>
          </Row>
        </Layout.Header>

        <Layout.Content>
          <Row style={{width: '100%'}} justify='center'>
            <Col span={22}>
              <Row gutter={16} style={{ marginTop: '40px' }} justify='center'>
                <Col span={20}>
                  <Simulation {...this.state} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Drawer
            title='Configurações'
            placement='left'
            closable={true}
            onClose={this.closeDrawer}
            visible={this.state.settingsVisible}
            width='400px'
            style={{position: 'absolute'}}
            getContainer={false}
            footer={
              <div style={{textAlign: 'right'}}>
                <Button onClick={this.closeDrawer} style={{marginRight: 8}}>
                  Cancelar
                </Button>
                <Button onClick={this.onSave} type='primary'>
                  Salvar
                </Button>
              </div>
            }
          >
            <Settings {...this.state} formRef={this.formRef}/>
          </Drawer>
        </Layout.Content>

        <Layout.Footer style={{textAlign: 'center', bottom: '0px', position: 'absolute', width: '100vw'}}>
          Vacatronics (c) 2020
        </Layout.Footer>
      </Layout>
    );
  }
}

export default App;
