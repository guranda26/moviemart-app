'use client'

import ReturnBackButton from '@/components/ReturnBack'
import TermsAndConditionsPage from '@/components/Terms'
import { useTranslation } from 'react-i18next'
import React from 'react'

const TermsPage = () => {
  const { t } = useTranslation()
  return (
   <div className='relative'>
    <div className="fixed top-6 left-8">
      <ReturnBackButton returnBackTxt={t("common:return")} />
    </div>
    <TermsAndConditionsPage />
 </div>
  )
}

export default TermsPage
