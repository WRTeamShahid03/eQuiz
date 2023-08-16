"use client"

import { Fragment, Suspense, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TopHeader from "../smalltopheader/TopHeader";
import { I18nextProvider, useTranslation } from "react-i18next";
import { LoadWebSettingsDataApi, websettingsData } from "src/store/reducers/webSettings";
import { settingsLoaded, sysConfigdata, systemconfigApi } from "src/store/reducers/settingsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "src/store/reducers/languageSlice";
import language from "../../../utils/language"
import { RiseLoader } from "react-spinners";
import { useRouter } from "next/router";
import { authRoutes, protectedRoutes, publicRoutes } from "src/routes/routes";

const Layout = ({ children, header, footer }) => {
  const { i18n } = useTranslation();

  const navigate = useRouter()

    const [redirect, setRedirect] = useState(false);

    const [LoadData, setLoadData] = useState(false);

    const selectcurrentLanguage = useSelector(selectCurrentLanguage);



    // all settings data
    useEffect(() => {
        // load data in redux
        settingsLoaded("");

        LoadWebSettingsDataApi(
            (response) => {
                setLoadData(true);
            },
            () => {}
        );

        systemconfigApi(
            (success) => {},
            (error) => {
                console.log(error);
            }
        );

        i18n.changeLanguage(selectcurrentLanguage.code);
    }, []);

    // Maintainance Mode
    const getsysData = useSelector(sysConfigdata);

    useEffect(() => {
        if (getsysData && getsysData.app_maintenance === "1") {
            setRedirect(true);
        } else {
            setRedirect(false);
        }
    }, [getsysData.app_maintenance]);

    const websettingsdata = useSelector(websettingsData);

    const rtl_support = websettingsdata && websettingsdata.rtl_support;

    const userData = useSelector((state) => state.User);


    // rtl
    useEffect(() => {
        if (rtl_support === "1") {
        document.documentElement.dir = "rtl";
        } else {
        document.documentElement.dir = "ltr";
        }
    }, [rtl_support]);

    // loader
    const loaderstyles = {
        loader: {
          textAlign: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        },
        img: {
          maxWidth: "100%",
          maxHeight: "100%",
        },
    };

    // Function to handle navigation to maintenance page
  const handleMaintenanceRedirect = () => {
    navigate.push("/maintenance");
  };

  useEffect(() => {
    if (redirect) {
      handleMaintenanceRedirect(); // Trigger the navigation outside the JSX
    }
  }, [redirect]);


  // Get the Next.js router instance
  const router = useRouter();

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(router.pathname);

  // Check if the user is authenticated based on the presence of the token
  const isAuthenticated = userData.token;

  // Check if the current route requires authentication
  const requiresAuth = protectedRoutes.includes(router.pathname);

  useEffect(() => {
    authCheck()
  },[requiresAuth])

  const authCheck = () => {
    if(requiresAuth){
      if(isAuthenticated === null){
        router.push("/login");
        toast.error("please login first");
        return;
      }
    }
  }

  // Check if the current route is an authentication route
  const isAuthRoute = authRoutes.includes(router.pathname);

  useEffect(() => {
    notAccessAfterLogin()
  },[isAuthRoute])

  const notAccessAfterLogin = () => {
    if(isAuthenticated){
      if(isAuthRoute){
        router.push("/");
      }
    }
  }


    return (
      <Fragment>
        <I18nextProvider i18n={language}>
        <ToastContainer theme="colored" />
        {LoadData ? (
          <>
            <TopHeader />
            <Header header={header} />
              {children}
            <Footer footer={footer} />
          </>
        ) : (
          <div className="loader" style={loaderstyles.loader}>
            <RiseLoader color="#ef5488" className="inner_loader" style={loaderstyles.img} />
          </div>
        )}
      </I18nextProvider>
    </Fragment>
  );
};
export default Layout;