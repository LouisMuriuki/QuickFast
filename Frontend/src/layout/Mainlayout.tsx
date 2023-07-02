import { Breadcrumb, Layout, theme, ConfigProvider, FloatButton } from "antd";
import type { ThemeConfig } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AppNav from "../components/Navbar/AppNav";
import { CommentOutlined } from "@ant-design/icons";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import AddClient from "../Pages/clients/components/AddClient";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
  const axiosprivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getUser = async () => {
    const response = await axiosprivate.get(
      `/users/getuser?id=${auth?.userId}`,
      {
        headers: { Authorization: "Bearer " + auth?.accessToken },
      }
    );
    console.log(response);
    return response.data;
  };

  const getUserQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  useEffect(() => {
    setAuth((prev) => ({
      ...prev,
      username: getUserQuery.data?.data?.username,
    }));
  }, [getUserQuery.data]);

  useEffect(() => {
    navigate("invoices");
  }, []);

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
          <div className="w-[90%] h-screen" style={{ background: colorBgContainer }}>
            <Outlet />
          </div>
          <Login />
          <Register />
          <AddClient />
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
