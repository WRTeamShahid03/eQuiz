import React from 'react'
import { withTranslation } from "react-i18next";
import { Loadtempdata } from 'src/store/reducers/tempDataSlice';
import Link from 'next/link';

const AudioQuestionsIntro = ({ data, active, url, subcategoryid }) => {

  let subcatdata = {
    subcategoryid: subcategoryid,
  }

  const subdataload = (allData) => {
    Loadtempdata(allData);
  }

  return (
    <div className="subcatintro__sec">
    <Link href={{ pathname: url}} onClick={() => subdataload(data)}>
      <div className={`card spandiv ${active}`}>
        <div className="card__name m-auto">
          <p className="text-center m-auto d-block">
            {data.subcategory_name}
          </p>
        </div>
      </div>
    </Link>
  </div>
  )
}

export default withTranslation()(AudioQuestionsIntro)