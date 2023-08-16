"use client"
import React, { Fragment } from 'react'
import {
  FaCamera,
  FaEnvelopeOpenText,
  FaMobileAlt,
  FaRegBookmark,
  FaSignOutAlt,
  FaTrashAlt,
  FaUserCircle
} from 'react-icons/fa'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { withTranslation } from 'react-i18next'
import { imgError } from '../../utils'
import { BsCoin, BsFillBookmarkCheckFill } from 'react-icons/bs'
import { AiOutlinePieChart, AiOutlineShareAlt } from 'react-icons/ai'
import { IoWalletOutline } from 'react-icons/io5'
import { profileImages } from '../../assets/json/profileImages'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import Link from 'next/link'
import { useRouter } from "next/router";
import Breadcrumb from 'src/@core/components/Breadcrumb/Breadcrumb'
import Image from 'next/image'

const MySwal = withReactContent(Swal)

SwiperCore.use([Navigation])

const GuestProfile = ({ t }) => {

  const router = useRouter();

  // profile image logout
  const guestLogout = e => {
    e.preventDefault()
    MySwal.fire({
      text: t('To access this feature you need to Login!!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef5488',
      confirmButtonText: 'Login',
      allowOutsideClick: false
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/login')
      }
    })
  }

  // update name and mobile
  const formSubmit = e => {
    guestLogout(e)
  }

  // update profile image
  const handleImageChange = e => {
    guestLogout(e)
  }

  const swiperOption = {
    loop: true,
    speed: 750,
    spaceBetween: 20,
    slidesPerView: 4,
    navigation: false,
    breakpoints: {
      0: {
        slidesPerView: 4.5
      },

      768: {
        slidesPerView: 4.5
      },

      992: {
        slidesPerView: 4.5
      },
      1200: {
        slidesPerView: 5.5
      }
    },
    autoplay: false
  }

  return (
    <Fragment>
      <Breadcrumb title={t('Profile')} content={t('Home')} contentTwo={t('Profile')} />
      <div className='Profile__Sec'>
        <div className='container px-1'>
          <div className='morphism'>
            <form onSubmit={formSubmit}>
              <div className='row pro-card position-relative'>
                <div className='col-xl-5 col-lg-4 col-md-12 col-12 '>
                  <div className='row card main__profile d-flex justify-content-center align-items-center'>
                    <div className='prop__image justify-content-center'>
                      <img
                        src="/images/user.svg"
                        alt='profile'
                        id='user_profile'
                        onError={imgError}
                      />
                      <div className='select__profile'>
                        <input type='file' name='profile' id='file' onChange={handleImageChange} />
                        <label onClick={e => guestLogout(e)}>
                          {' '}
                          <em>
                            <FaCamera />
                          </em>
                        </label>
                      </div>
                    </div>
                    <div className='prop__title justify-content-center'>
                      <h3>{t('Hello Guest')}</h3>
                    </div>

                    <p className='mb-0 d-flex justify-content-center'>OR</p>
                    {/* dummy image slider */}
                    <div className='dummy_image_slider'>
                      <div className='d-flex select_profile justify-content-center'>
                        <h6 className='pt-2'>{t('Select Profile Photo')}</h6>
                      </div>
                      <Swiper {...swiperOption}>
                        {profileImages &&
                          profileImages.map((elem, key) => {
                            return (
                              <SwiperSlide key={key}>
                                <div className='pt-2 image_section'>
                                  <img
                                    src={elem.img}
                                    alt='profile'
                                    onClick={e => guestLogout(e)}
                                    data-file={elem.img.split('/').pop()}
                                  />
                                </div>
                              </SwiperSlide>
                            )
                          })}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div className='col-xl-7 col-lg-8 col-md-12 col-12 border-line'>
                  <div className='card p-4 bottom__card_sec'>
                    <div className='row'>
                      <div className='col-md-6 col-12'>
                        <label htmlFor='fullName'>
                          <input type='text' name='name' id='fullName' placeholder={t('Enter Your Name')} required />
                          <i className='custom-icon'>
                            <FaUserCircle />
                          </i>
                        </label>
                      </div>
                      <div className='col-md-6 col-12'>
                        <label htmlFor='mobilenumber'>
                          <input
                            type='number'
                            name='mobile'
                            id='mobilenumber'
                            className='mobile'
                            placeholder={t('Enter Your Mobile Number')}
                            min='0'
                            onWheel={event => event.currentTarget.blur()}
                          />
                          <i className='custom-icon'>
                            <FaMobileAlt />
                          </i>
                        </label>
                      </div>
                    </div>
                    <button
                      className='btn btn-primary text-uppercase mt-4'
                      type='submit'
                      value='submit'
                      name='submit'
                      id='mc-embedded-subscribe'
                    >
                      {t('Update')}
                    </button>

                    <div className='bottom__profile_card'>
                      <div className='row'>
                        <div className='col-md-6 col-12'>
                          <div className='bookmark__content common_content'>
                            <Link href="" onClick={e => guestLogout(e)} className='w-100 d-block'>
                              <span>{t('bookmark')}</span>
                              <i className='custom-icon'>
                                <FaRegBookmark />
                              </i>
                            </Link>
                          </div>
                        </div>
                        <div className='col-md-6 col-12'>
                          <div className='Invite_friends__content common_content'>
                            <Link href="" onClick={e => guestLogout(e)} className='w-100 d-block'>
                              <span>{t('Invite Friends')}</span>
                              <i className='custom-icon'>
                                <FaEnvelopeOpenText />
                              </i>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-12'>
                          <div className='tracker_data common_content'>
                            <Link href="" onClick={e => guestLogout(e)} className='w-100 d-block'>
                              <span>{t('Coin History')}</span>
                              <i className='custom-icon'>
                                <BsCoin />
                              </i>
                            </Link>
                          </div>
                        </div>
                        <div className='col-md-6 col-12'>
                          <div className='badges common_content'>
                            <Link href="" onClick={e => guestLogout(e)} className='w-100 d-block'>
                              <span>{t('Badges')}</span>
                              <i className='custom-icon'>
                                <BsFillBookmarkCheckFill />
                              </i>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-12'>
                          <div className='share_app common_content'>
                            <Link href="" className='w-100 d-block' onClick={e => guestLogout(e)}>
                              <span>{t('Share App')}</span>
                              <i className='custom-icon'>
                                <AiOutlineShareAlt />
                              </i>
                            </Link>
                          </div>
                        </div>

                        <div className='col-md-6 col-12'>
                          <div className='statistics common_content'>
                            <Link href="" onClick={e => guestLogout(e)} className='w-100 d-block'>
                              <span>{t('Statistics')}</span>
                              <i className='custom-icon'>
                                <AiOutlinePieChart />
                              </i>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-12'>
                          <div className='wallet common_content'>
                            <Link href="" onClick={e => guestLogout(e)} className='w-100 d-block'>
                              <span>{t('Wallet')}</span>
                              <i className='custom-icon'>
                                <IoWalletOutline />
                              </i>
                            </Link>
                          </div>
                        </div>
                        <div className='col-md-6 col-12'>
                          <div className='Delete_account__content common_content'>
                            <Link href="" onClick={e => guestLogout(e)} className='w-100 d-block'>
                              <span>{t('Delete Account')}</span>
                              <i className='custom-icon'>
                                <FaTrashAlt />
                              </i>
                            </Link>
                          </div>
                        </div>
                        <div className='col-md-6 col-12'>
                          <div className='Logout__content common_content'>
                            <Link href="" onClick={e => guestLogout(e)} className='w-100 d-block'>
                              <span>{t('Logout')}</span>
                              <i className='custom-icon'>
                                <FaSignOutAlt />
                              </i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default withTranslation()(GuestProfile)
