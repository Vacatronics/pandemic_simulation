import React, { Component } from 'react'
import { Card, Form, InputNumber, Button, Slider } from 'antd'
import { PlayCircleOutlined, PauseCircleFilled, ReloadOutlined } from '@ant-design/icons'


/**
 *
 *
 * @class Settings
 * @extends {Component}
 */
class Settings extends Component {

  formRef = React.createRef();

  render() {
    return (
      <Card title='Configurações'>
        <Form 
          initialValues={this.props.settings}
          layout={'horizontal'}
          wrapperCol={{span: 12}}
          labelCol={{span: 10}}
          style={{width: '100%'}}
          onFinish={this.props.onFinished}
          ref={this.formRef}
        >
          <Form.Item label='Número' name='number'>
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>

          <Form.Item label='Raio de contágio' name='infectionRadius'>
            <Slider min={0.1} max={10} step={0.1} marks={{0: '0', 5: '5', 10: '10'}}/>
          </Form.Item>

          <Form.Item label='Prob. de contágio' name='infectionProb'>
            <Slider step={0.1} marks={{0: '0%', 50: '50%', 100: '100%'}}/>
          </Form.Item>

          <Form.Item label='Dias infectados' name='infectionDays'>
            <Slider min={1} max={30} marks={{1: '1', 15: '15', 30: '30'}}/>
          </Form.Item>

          <Form.Item label='Dias sintomas' name='infectionSymptomDays'>
            <Slider min={1} max={30} range marks={{1: '1', 15: '15', 30: '30'}}/>
          </Form.Item>

          <Form.Item label='Letalidade' name='infectionLethality'>
            <Slider step={0.1} marks={{0: '0%', 50: '50%', 100: '100%'}}/>
          </Form.Item>

          <Form.Item label='Velocidade' name='speed'>
            <Slider min={0.1} max={10} step={0.1} marks={{0: '0x', 5: '5x', 10: '10x'}}/>
          </Form.Item>

          <Form.Item wrapperCol={{span: 24}}>
            <Button type='primary' icon={<ReloadOutlined />} htmlType='submit' style={{marginRight: '10px'}}>
              Reiniciar
            </Button>
            {
              this.props.running ? (
                <Button type='primary' icon={<PauseCircleFilled />} onClick={() => this.props.onPlay(false, null)}>
                  Stop
                </Button>
              ) : (
                <Button type='primary' icon={<PlayCircleOutlined />} onClick={() => this.props.onPlay(true, this.formRef.current.getFieldsValue())}>
                  Play
                </Button>
              )
            }
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export {Settings}
