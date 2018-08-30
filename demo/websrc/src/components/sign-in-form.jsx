import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;
import { signInApi, signInForm } from '../common/signin.js';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    const values = await this.getFormValues();
    if (!values) {
      message.error( '系统繁忙，稍后再试！' );
    }
    const result = await signInApi(values);
    if (result && result.errno === 0) {
      message.success('登录成功!');
      signInForm(values);
    } else if (result && result.errmsg) {
      message.error(result.errmsg);
    }
  }

  getFormValues() {
    return new Promise((resolve, reject) => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          resolve(values);
        } else {
          reject(null)
        }
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ width: '280', margin: '0 auto'}}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required:true, message: 'Please input your username!'}],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required:true, message:'Please input your Password!'}]
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住登录</Checkbox>
            )}
            <a className="login-form-forgot">忘记密码</a><br/>
            <Button type="primary" htmlType="submit" className="login-form-button">确定</Button>
            Or <a href="">注册!</a>
          </FormItem>
        </Form>
      </div>

    )
  }
}

const SignInForm = Form.create()(SignIn)

export default SignInForm;
