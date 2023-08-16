import React from 'react'
import { withTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import purify from 'dompurify'
import Breadcrumb from 'src/@core/components/Breadcrumb/Breadcrumb'
import { settingsData } from 'src/store/reducers/settingsSlice'

const Instruction = ({ t }) => {
  const selectdata = useSelector(settingsData)

  const appdata = selectdata.filter(item => item.type === 'instructions')

  const data = appdata[0].message

  return (
    <React.Fragment>
      <Breadcrumb title={t('Instruction')} content={t('Home')} contentTwo={t('Instruction')} />
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

export default withTranslation()(Instruction)
