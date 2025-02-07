'use client'

import PrivacyPageComponent from '@/components/PrivacyPage'
import ReturnBackButton from '@/components/ReturnBack'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Privacy = () => {
  const { t } = useTranslation()
  return (
    <div className='relative'>
      <div className="fixed top-6 left-8">
        <ReturnBackButton returnBackTxt={t("common:return")} />
      </div>
      <PrivacyPageComponent />
    </div>
  )
}

export default Privacy
