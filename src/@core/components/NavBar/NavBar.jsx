"use client"
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { withTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
const NavBar = ({ t }) => {

    const router = useRouter();

    const isActive = (to) => {
        return router.pathname === to;
    };

    return (
        <nav className="site-main-menu">
            <ul>
                <li>
                    <Link href="/" className={isActive("/") ? "navbar__link--active" : ""}>
                        <span className="menu-text">{t("Home")}</span>
                    </Link>
                </li>
                <li>
                    <Link href="/quiz-play" className={isActive("/quiz-play") ? "navbar__link--active" : ""}>
                        <span className="menu-text">{t("Quiz Play")}</span>
                    </Link>
                </li>
                <li>
                    <Link href="/bookmark" className={isActive("/bookmark") ? "navbar__link--active" : ""}>
                        <span className="menu-text">{t("bookmark")}</span>
                    </Link>
                </li>
                <li>
                    <Link href="/invite-friends" className={isActive("/invite-friends") ? "navbar__link--active" : ""}>
                        <span className="menu-text">{t("Invite Friends")}</span>
                    </Link>
                </li>
                <li>
                    <Link href="/instruction" className={isActive("/instruction") ? "navbar__link--active" : ""}>
                        <span className="menu-text">{t("Instruction")}</span>
                    </Link>
                </li>
                <li>
                    <Link href="/leaderboard" className={isActive("/leaderboard") ? "navbar__link--active" : ""}>
                        <span className="menu-text">{t("LeaderBoard")}</span>
                    </Link>
                </li>
                <li className="has-children">
                    <Link href="">
                        <span className="menu-text">{t("More")}</span>
                    </Link>
                    <span className="menu-toggle">
                        <i className="">
                            <FaAngleDown />
                        </i>
                    </span>
                    <ul className="sub-menu">
                        <li>
                            <Link href="/contact-us" className={isActive("/contact-us") ? "navbar__link--active" : ""}>
                                <span className="menu-text">{t("Contact Us")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about-us" className={isActive("/about-us") ? "navbar__link--active" : ""}>
                                <span className="menu-text">{t("About Us")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms-conditions" className={isActive("/terms-conditions") ? "navbar__link--active" : ""}>
                                <span className="menu-text">{t("Terms and Conditions")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy" className={isActive("/privacy-policy") ? "navbar__link--active" : ""}>
                                <span className="menu-text">{t("Privacy Policy")}</span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default withTranslation()(NavBar);
