import React, { Component } from 'react'
import { Card, Form, InputNumber, Button } from 'antd'


/**
 *
 *
 * @class Settings
 * @extends {Component}
 */
class Settings extends Component {

  render() {
    return (
      <Card title='Configurações'>
        <Form 
          initialValues={this.props}
          onFinish={this.props.onFinished}
        >
          <Form.Item label='Número' name='number'>
            <InputNumber />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>Reiniciar</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export {Settings}
