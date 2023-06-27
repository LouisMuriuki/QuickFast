import { Breadcrumb, Layout, theme, ConfigProvider, FloatButton } from "antd";
import type { ThemeConfig,  } from "antd";
import {Link, Outlet } from "react-router-dom";
import AppNav from "../components/Navbar/AppNav";
import { CommentOutlined } from "@ant-design/icons";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import AddClient from "../Pages/clients/components/AddClient";

const { Header, Content, Footer } = Layout;

// interface LayoutProps {
//   children: ReactNode;
// }

const config: ThemeConfig = {
  token: {
    colorPrimaryTextActive: "#ffca28",
  },
};

const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const App: React.FC = () => {
  //   const [current, setCurrent] = useState('mail');

  //   const onClick: MenuProps['onClick'] = (e) => {
  //     console.log('click ', e);
  //     setCurrent(e.key);
  //   };

  //   return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
  // };

  return (
    <ConfigProvider theme={config}>
      <Layout className="layout">
        <Header style={{ display: "flex" }}>
          <AppNav />
        </Header>
        <Content className="overflow-hidden" style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Link to="/new">New</Link>
          </Breadcrumb>
          <div className="w-[90%]" style={{ background: colorBgContainer }}>
            <Outlet />
          </div>
          <Login/>
          <Register/>
          <AddClient/>
          <FloatButton icon={<CommentOutlined />} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Easy Quick Invoice ©2023
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
