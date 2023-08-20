import { Breadcrumb, Layout, theme, ConfigProvider, FloatButton } from "antd";
import type { ThemeConfig } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppNav from "../components/Navbar/AppNav";
import { CommentOutlined } from "@ant-design/icons";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import AddClient from "../Pages/clients/components/AddClient";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import { SettingsContext } from "../Context/SettingsContext";
import ProfilePopup from "../components/popup/ProfilePopup";
import Notifications from "../components/Notifications/Notifications";
import ExtrasContext from "../Context/ExtrasContext";

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
  const { notifications } = useContext(ExtrasContext);
  const axiosprivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { setBizInfo, setCustomizeInfo, set_ID } = useContext(SettingsContext);

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
  console.log(getUserQuery.data);

  useEffect(() => {
    if (auth.accessToken) {
      getUserQuery.refetch();
    }
  }, [auth?.accessToken]);

  useEffect(() => {
    setAuth((prev) => ({
      ...prev,
      username: getUserQuery.data?.data?.currentUser.username,
      email: getUserQuery.data?.data?.currentUser.email,
      isadmin: getUserQuery.data?.data?.currentUser.isAdmin,
      totalbilled: getUserQuery.data?.data?.currentUser.totalbilled,
      package: getUserQuery.data?.data?.packageType.packageName,
      price: getUserQuery.data?.data?.packageType.price,
      maxinvoices: getUserQuery.data?.data?.packageType.maxInvoices,
      overflow: getUserQuery.data?.data?.currentUser.overflow,
      days: getUserQuery.data?.data?.currentUser.days,
    }));
  }, [getUserQuery.data]);

  const getSettings = async () => {
    const res = await axiosprivate.get(
      `settings/getdefaultsettings?id=${auth.userId}`,
      {
        headers: { Authorization: "bearer " + auth.accessToken },
      }
    );
    console.log(res);
    return res.data;
  };

  const getSettingsQuery = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });
  console.log(getSettingsQuery?.data);

  useEffect(() => {
    if (getSettingsQuery?.data?.data?.settings) {
      setBizInfo(getSettingsQuery?.data?.data?.settings?.bizinfo);
      setCustomizeInfo(getSettingsQuery?.data?.data?.settings?.customizeinfo);
      set_ID(getSettingsQuery?.data?.data?._id);
    }
  }, [getSettingsQuery?.data]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("invoices");
    }
  }, [location]);

  return (
    <ConfigProvider theme={config}>
      <Layout className="layout min-w-full">
        {notifications ? <Notifications /> : ""}
        <Header
          className="p-0 m-0 pb-2 sticky top-0 z-10"
          style={{ display: "flex" }}
        >
          <AppNav />
        </Header>
        <Content className="overflow-hidden py-[5px] md:px-[50px]">
          <Breadcrumb
            className="my-[6px] mx-[6px] md:my-[16px] text-[#001529]"
            items={[{ title: location.pathname.slice(1) }]}
          />
          <div
            className="w-full md:w-[90%] h-screen overflow-y-auto"
            style={{ background: colorBgContainer }}
          >
            <Outlet />
          </div>
          <Login />
          <Register />
          <AddClient />
          <FloatButton icon={<CommentOutlined />} />
          {auth.accessToken && <ProfilePopup />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Easy Quick Invoice ©2023
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
