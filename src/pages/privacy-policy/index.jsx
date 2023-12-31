import React from 'react'
import { withTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { settingsData } from '../../store/reducers/settingsSlice'
import purify from 'dompurify'
import Breadcrumb from 'src/@core/components/Breadcrumb/Breadcrumb'

const PrivacyPolicy = ({ t }) => {
  const selectdata = useSelector(settingsData)

  const appdata = selectdata.filter(item => item.type === 'privacy_policy')

  const data = appdata[0].message

  return (
    <React.Fragment>
      <Breadcrumb title={t('Privacy Policy')} content={t('Home')} contentTwo={t('Privacy Policy')} />
      <div className='Instruction'>
        <div className='container'>
          <div className='row morphisam'>
            {data ? (
              <div className='col-12 ' dangerouslySetInnerHTML={{ __html: purify.sanitize(data) }}></div>
            ) : (
              <div className='text-center text-white'>
                <Skeleton count={5} />
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default withTranslation()(PrivacyPolicy)
