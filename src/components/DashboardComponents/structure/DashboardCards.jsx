import { Card, Col, Flex, Row, Skeleton, Typography } from 'antd'
import { message } from "antd";
import { useTranslation } from 'react-i18next';
import { toArabicDigits } from '../../../shared';
import { GET_DASHBOARD_STATS } from '../../../graphql/query/dashboard';
import { useLazyQuery } from '@apollo/client/react'
import { useEffect, useState } from 'react';

const { Title, Text } = Typography
const DashboardCards = () => {
  const {t,i18n} = useTranslation()
  const isArabic = i18n?.language === 'ar'
   const [dashboardStats, setDashboardStats]= useState(null)
  const [getDashboardStats, { data,loading }] = useLazyQuery(GET_DASHBOARD_STATS, {
      fetchPolicy: "network-only",
  })
  useEffect(()=>{
      if(getDashboardStats)
          getDashboardStats()
  }, [getDashboardStats])
  useEffect(()=>{
      if(data?.getDashboardCountApi){
          const {basicPlanBusinesses, enterprisePlanBusinesses, proPlanBusinesses, standardPlanBusinesses, totalBusinesses}= data?.getDashboardCountApi
          setDashboardStats({
            basicPlanBusinesses,
            enterprisePlanBusinesses,
            proPlanBusinesses,
            standardPlanBusinesses,
            totalBusinesses
          })
      }
  }, [data])

  const cardsData = [
    {
      id: 1,
      icon: '/assets/icons/briefcase-w.webp',
      title: dashboardStats?.totalBusinesses || 0,
      subtitle: "Total Businesses",
    },
    {
      id: 2,
      icon: '/assets/icons/plan-business.webp',
      title: dashboardStats?.basicPlanBusinesses || 0,
      subtitle: "Basic Plan Businesses",
    },
    {
      id: 3,
      icon: '/assets/icons/plan-business.webp',
      title: dashboardStats?.standardPlanBusinesses || 0,
      subtitle: "Standard Plan Businesses",
    },
    {
      id: 4,
      icon: '/assets/icons/plan-business.webp',
      title: dashboardStats?.proPlanBusinesses || 0,
      subtitle: "Pro Plan Businesses",
    },
    {
      id: 5,
      icon: '/assets/icons/plan-business.webp',
      title: dashboardStats?.enterprisePlanBusinesses || 0,
      subtitle: "Enterprise Plan Businesses",
    },
  ])
  const [getDashboardStats, { data, loading}] = useLazyQuery(GET_DASHBOARD_STATS, {
      fetchPolicy: "network-only",
  })
  useEffect(()=>{
    getDashboardStats()
  }, [])
  useEffect(()=>{
    if(data?.getDashboardCountApi){
      setStats(
        [
          {
            id: 1,
            icon: '/assets/icons/briefcase-w.webp',
            title: data?.getDashboardCountApi?.totalBusinesses,
            subtitle: "Total Businesses", 
          },
          {
            id: 2,
            icon: '/assets/icons/plan-business.webp',
            title: data?.getDashboardCountApi?.basicPlanBusinesses,
            subtitle: "Basic Plan Businesses",
          },
          {
            id: 3,
            icon: '/assets/icons/plan-business.webp',
            title: data?.getDashboardCountApi?.standardPlanBusinesses,
            subtitle: "Standard Plan Businesses",
          },
          {
            id: 4,
            icon: '/assets/icons/plan-business.webp',
            title: data?.getDashboardCountApi?.proPlanBusinesses,
            subtitle: "Pro Plan Businesses",
          },
          {
            id: 5,
            icon: '/assets/icons/plan-business.webp',
            title: data?.getDashboardCountApi?.enterprisePlanBusinesses,
            subtitle: "Enterprise Plan Businesses",
          },
        ]
      )
    }
  }, [data])
  return (
    <>
    <Row gutter={[14,24]} className='h-100'>
        {
          loading ?
            new Array(5)?.fill(null)?.map((_, index)=>
              <Col 
                xs={{ flex: '100%' }}
                sm={{ flex: '50%' }}
                md={{ flex: '50%' }}
                lg={{ flex: '20%' }}
                xl={{ flex: '20%' }} 
                key={'skelton-card-' + index}
              >
                <Skeleton.Button 
                  active 
                  size='large' 
                  shape='square'
                  block
                  style={{width:'100%', height:'150px',borderRadius:5}}
                />
              </Col>
            )
            :
            cardsData?.map((item,index)=>
              <Col xs={{ flex: '100%' }}
                sm={{ flex: '50%' }}
                md={{ flex: '50%' }}
                lg={{ flex: '20%' }}
                xl={{ flex: '20%' }} key={index}>
                  <Card className={`card-bg h-100 border-gray card-cs ${index === 0 ? 'brand-bg':null}`}>
                      <Flex gap={8} vertical>
                          <div>
                              <img src={item?.icon} width={45} alt='statistics icon' fetchPriority="high" />
                          </div>
                          <Text className={`fs-14 ${index === 0 ? 'text-white':'text-gray'}`}>{t(item?.subtitle)}</Text>
                          <Title level={isArabic ? 4:5} className={`fw-600 m-0 ${index === 0 ? 'text-white':'text-black'}`}>
                            {(isArabic ? toArabicDigits(item?.title):item?.title)}
                          </Title>
                      </Flex>
                  </Card>
              </Col>
            )
        }
    </Row>
    </>
  )
}

export {DashboardCards}