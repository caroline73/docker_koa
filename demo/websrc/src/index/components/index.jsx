import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import HeaderNav from '../../components/header-nav.jsx';
import FooterCommon from '../../components/footer-common.jsx';

const { Content} = Layout;

class App extends React.Component {
  render() {
    return(
      <Layout className="layout">
      <HeaderNav />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <p>index</p>
        </div>
      </Content>
      <FooterCommon />
    </Layout>
    )
  }
}

export default App;