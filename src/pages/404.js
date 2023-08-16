import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { withTranslation } from "react-i18next";
import Link from "next/link";
import Breadcrumb from "src/@core/components/Breadcrumb/Breadcrumb";

const NotFound = ({ t }) => {
    return (
        <React.Fragment>
            <Breadcrumb title={t("404")} content={t("Home")} contentTwo={t("404")} />
            <div className="error_page morphisam">
                <div className="image_error">
                    <img src="/images/404/404.svg" alt="404" />
                </div>
                <div className="title_error">
                    <h1>{t("Oops, looks like the page is lost")}</h1>
                </div>
                <div className="title_para">
                    <p>{t("This is not a fault, just an accident that was not intentional")}</p>
                </div>
                <div className="error_button">
                    <Link href="/" className="btn btn-primary">
                        <i>
                            <FaArrowLeft />
                        </i>{" "}
                        {t("Back")}
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withTranslation()(NotFound);
