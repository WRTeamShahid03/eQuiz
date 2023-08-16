"use client"
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Dropdown, DropdownButton } from "react-bootstrap";

import { useTranslation, withTranslation } from "react-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";

import { IoExitOutline } from "react-icons/io5";

import Link from "next/link";
import { selectCurrentLanguage, selectLanguages } from "src/store/reducers/languageSlice";
import { sysConfigdata } from "src/store/reducers/settingsSlice";
import CustomHoverDropdown from "../../Common/CustomHoverDropdown";
import FirebaseData from "src/utils/firebase";
import { isLogin } from "src/utils";
import menu_data from "./menu-data";
import { useRouter } from "next/router";

const MySwal = withReactContent(Swal);

const MobileMenus = ({t,setIsActive}) => {

  const navigate = useRouter()
  const [navTitle, setNavTitle] = useState("");
  //openMobileMenu
  const openMobileMenu = (menu) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };

  const firebase = FirebaseData();
  const { i18n } = useTranslation();

  const userData = useSelector((state) => state.User);
  const languages = useSelector(selectLanguages);
  const systemconfig = useSelector(sysConfigdata);
  const selectcurrentLanguage = useSelector(selectCurrentLanguage);
  const [guestlogout,setGuestLogout] = useState(false);
  const { menuOpen, handlers} = CustomHoverDropdown();


  const handleSignout = () => {
      MySwal.fire({
          title: t("Logout"),
          text: t("Are you sure"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#ef5488",
          cancelButtonColor: "#d33",
          confirmButtonText: t("Logout"),
      }).then((result) => {
          if (result.isConfirmed) {
              logout();
              firebase.auth.signOut();
              navigate.push('/');
          }
      });
  };

  const onClickHandler = (e) => {
      // clickOutside(noClose)
      const target = e.currentTarget;
      const parentEl = target.parentElement;
      if (parentEl?.classList.contains("menu-toggle") || target.classList.contains("menu-toggle")) {
          const element = target.classList.contains("icon") ? parentEl : target;
          const parent = getClosest(element, "li");
          const childNodes = parent.childNodes;
          const parentSiblings = getSiblings(parent);
          parentSiblings.forEach((sibling) => {
              const sibChildNodes = sibling.childNodes;
              sibChildNodes.forEach((child) => {
                  if (child.nodeName === "UL") {
                      slideUp(child, 1000);
                  }
              });
          });
          childNodes.forEach((child) => {
              if (child.nodeName === "UL") {
                  slideToggle(child, 1000);
              }
          });
      }
  };

  const languageChange = async (name, code, id) => {
      setCurrentLanguage(name, code, id);
      await i18n.changeLanguage(code);
  };

  // initial username
  let userName = "";

  const checkUserData = (userData) => {
      if (userData.data && userData.data.name !== "") {
          return (userName = userData.data.name);
      } else if (userData.data && userData.data.email !== "") {
          return (userName = userData.data.email);
      } else {
          return (userName = userData.data.mobile);
      }
  };

   // guest logout
   const guestLogout = (e) => {
      e.preventDefault();
      setGuestLogout(true)
      navigate.push("/login");
  }

  // profile image logout
  const profileGuest = (e) => {
      e.preventDefault();
      MySwal.fire({
          text: (t("To access this feature you need to Login!!")),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#ef5488",
          confirmButtonText: "Login",
          allowOutsideClick: false,
      }).then((result) => {
          if (result.isConfirmed) {
              guestLogout(e);
          }
      });
  }


  return (
    <>
      <nav className="mean-nav site-mobile-menu">
        <ul>
        <li className="has-children">
                    {systemconfig && systemconfig.language_mode === "1" ? (
                        <div className="dropdown__language mb-2">
                            <DropdownButton onMouseEnter={handlers.onMouseEnter}
                                    onMouseLeave={handlers.onMouseLeave}
                                    show={menuOpen} className="inner-language__dropdown" title={selectcurrentLanguage && selectcurrentLanguage.name ? selectcurrentLanguage.name : "Select Language"}>
                                {languages &&
                                    languages.map((data, key) => {
                                        return (
                                            <Dropdown.Item onClick={() => { languageChange(data.language, data.code, data.id); setIsActive(false)}} key={key}>
                                                {data.language}
                                            </Dropdown.Item>
                                        );
                                    })}
                            </DropdownButton>
                        </div>
                    ) : (
                        ""
                    )}
          </li>
          {isLogin() && checkUserData(userData) ? (
                    <li className="has-children">
                        <Link href="#">
                            <span className="menu-text">{userName}</span>
                        </Link>
                        <span className="menu-toggle" onClick={onClickHandler}>
                            <i className="">
                                <FaAngleDown />
                            </i>
                        </span>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/profile" onClick={() => setIsActive(false)}>
                                    <span className="menu-text">{t("Profile")}</span>
                                </Link>
                            </li>
                            <li>
                                  <Link  onClick={() => { handleSignout(); setIsActive(false) }}>
                                    <span className="menu-text">{t("Logout")}</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                ) : (
                        <>
                            {!guestlogout ?
                                <div className="right_guest_profile mb-2">
                                      <img className="profile_image" onClick={(e) => { profileGuest(e); setIsActive(false) }} src="images/profileimages/6.svg" alt="profile" />
                                    <button className="btn btn-primary " onClick={(e) => {profileGuest(e); setIsActive(false) }} >{`${t("Hello Guest")}`}</button>
                                      <button className="btn btn-primary custom_button_right ms-2" onClick={(e) => { guestLogout(e); setIsActive(false) }} ><IoExitOutline/></button>
                                </div>
                                :
                                <>
                                    <li>
                                        <Link href="/login" onClick={() => setIsActive(false)}>
                                            <span className="menu-text">{t("Login")}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/sign-up" onClick={() => setIsActive(false)}>
                                            <span className="menu-text">{t("Sign Up")}</span>
                                        </Link>
                                    </li>
                                </>
                            }
                        </>
                    )}
          {menu_data.map((menu, i) => (
            <React.Fragment key={i}>
              {menu.has_dropdown && (
                <li className="has-dropdown">
                  <Link href={menu.link} >{menu.title}</Link>
                  <ul
                    className="submenu"
                    style={{
                      display: navTitle === menu.title ? "block" : "none",
                    }}
                  >
                    {menu.sub_menus.map((sub, i) => (
                      <li key={i}>
                        <Link href={sub.link} onClick={() => setIsActive(false)}>{sub.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <a
                    className={`mean-expand ${
                      navTitle === menu.title ? "mean-clicked" : ""
                    }`}

                    onClick={() => openMobileMenu(menu.title)}
                    style={{ fontSize: "18px", cursor: "pointer" }}
                  >
                   <FaAngleDown />
                  </a>
                </li>
              )}
              {!menu.has_dropdown && (
                <li>
                  <Link href={menu.link} onClick={() => setIsActive(false)}>{menu.title}</Link>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default withTranslation()(MobileMenus);
