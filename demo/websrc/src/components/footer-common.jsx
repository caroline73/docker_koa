import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class FooterCommon extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Hello World @2018 Created By caroline zhang
      </Footer>
    )
  }
}

export default FooterCommon
