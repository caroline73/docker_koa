import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, message } from 'antd'
const FormItem = Form.Item;
import { signUpApi } from '../common/signup.js';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
  }

  getFormValues() {
    return new Promise((resolve, reject) => {
      this.props.form.validateFieldsAndScroll((err, values)=> {
        if (!err) {
          resolve(values);
        } else {
          reject(null);
        }
      });
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let values = await this.getFormValues();
    if (!values) {
      message.error( '系统繁忙，稍后再试！' )
    }
    let result = await signUpApi(values);
    if (result && result.errno === 0) {
      message.success( '注册成功！' );
      window.location.href = '/admin?signUpSuccess=true';
    } else {
      message.error(result.errmsg)
    }
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  }

  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldsValue(['password']).password) {
      callback('两次输入的密码不一致哦~');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      }
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              用户名
              <Tooltip title="必须是小写6-16位字母，或数字，或下划线，不能以数字开头">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
          hasFeedback>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: '请输入您的用户名' }], 
        })(
          <Input />
        )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail地址"
          hasFeedback>
        {getFieldDecorator('email', {
          rules: [{
            type: 'email', message: '请您输入正确格式的邮箱地址',
          }, {
            required: true, message: '请您输入邮箱地址！',
          }],
        })(
          <Input />
        )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请您输入您的账号密码！',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback>
          {getFieldDecorator('confirmPassword', {
            rules: [{
              required: true, message: '请您再次输入账号密码进行确认！',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>我已阅读 <a>《xxxx协议》</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">确定</Button>
        </FormItem>
      </Form>
    )
  }
}

const SignUpForm = Form.create()(SignUp);
export default SignUpForm;
