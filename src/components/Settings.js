import React, { Component } from 'react'
import { Form, InputNumber, Slider } from 'antd'


/**
 *
 *
 * @class Settings
 * @extends {Component}
 */
class Settings extends Component {

  render() {
    return (
      <Form
        initialValues={this.props.settings}
        layout={'horizontal'}
        wrapperCol={{ span: 12 }}
        labelCol={{ span: 10 }}
        style={{ width: '100%' }}
        onFinish={this.props.onFinished}
        ref={this.props.formRef}
      >
        <Form.Item label='Número' name='number'>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Raio de contágio' name='infectionRadius'>
          <Slider min={0.1} max={10} step={0.1} marks={{ 0: '0', 5: '5', 10: '10' }} />
        </Form.Item>

        <Form.Item label='Prob. de contágio' name='infectionProb'>
          <Slider step={0.1} marks={{ 0: '0%', 50: '50%', 100: '100%' }} />
        </Form.Item>

        <Form.Item label='Dias infectados' name='infectionDays'>
          <Slider min={1} max={30} marks={{ 1: '1', 15: '15', 30: '30' }} />
        </Form.Item>

        <Form.Item label='Dias sintomas' name='infectionSymptomDays'>
          <Slider min={1} max={30} range marks={{ 1: '1', 15: '15', 30: '30' }} />
        </Form.Item>

        <Form.Item label='Letalidade' name='infectionLethality'>
          <Slider step={0.1} marks={{ 0: '0%', 50: '50%', 100: '100%' }} />
        </Form.Item>

        <Form.Item label='Velocidade' name='speed'>
          <Slider min={0.1} max={10} step={0.1} marks={{ 0: '0x', 5: '5x', 10: '10x' }} />
        </Form.Item>
      </Form>
    )
  }
}

export { Settings }
