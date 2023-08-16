"use client"
import React, { Fragment, useEffect } from 'react'
import ScrollToTop from 'src/@core/components/ScrollToTop'
import ChooseUS from 'src/@core/components/home/Chooseus/ChooseUS'
import IntroSlider from 'src/@core/components/home/IntroSlider/IntroSlider'
import Feature from 'src/@core/components/home/feature/Feature'
import Process from 'src/@core/components/home/process/Process'
import { getAndUpdateBookmarkData, isLogin } from 'src/utils'


const Home = () => {
  useEffect(() => {
    if (isLogin()) {
      getAndUpdateBookmarkData()
    }
  }, [])
  return (
    <Fragment>
      <IntroSlider />
      <ChooseUS />
      <Feature />
      <Process />
      <ScrollToTop />
    </Fragment>
  )
}

export default Home
