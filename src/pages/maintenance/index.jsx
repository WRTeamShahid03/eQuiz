"use client"
import React, { Fragment } from "react";
import { withTranslation } from "react-i18next";
import Breadcrumb from "src/@core/components/Breadcrumb/Breadcrumb";

const Maintainance = ({ t }) => {
    return (
        <Fragment>
            <Breadcrumb title={t("Maintainance")} content={t("Home")} contentTwo={t("Maintainance")} />
            <div className="Maintainance">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-12 mx-auto">
                            <div className="morphisam">
                                <div className="left_image">
                                    <img src="/images/maintainance/maintenance.svg" className="maintain_img" title="maintainance"/>
                                </div>
                                <div className="right_text">
                                    <p>{t("We Apologize for the inconvenience, but we are performing some maintenance. We will back soon")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withTranslation()(Maintainance);
