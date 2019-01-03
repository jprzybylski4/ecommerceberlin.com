import {
  MyHead as Head,
  connect,
  WidgetVisitor,
  LayoutMain as Layout,
} from 'eventjuicer-site-components';

class PagePartner extends React.Component {
  static async getInitialProps({ query, asPath, isServer, store }) {
    return {};
  }

  render() {
    return (
      <Layout>
        <Head />
        <WidgetVisitor label="visitors.register_alt" />
      </Layout>
    );
  }
}

export default connect()(PagePartner);
