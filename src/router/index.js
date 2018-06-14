import Vue from 'vue'
import Router from 'vue-router'
import mapboxgl from 'mapbox-gl'

import Live_analysis from '@/components/Live_analysis'
import Value_forecast from '@/components/Value_forecast'
import image from '@/components/image'
import His_weather from '@/components/His_weather'
import tropical_wind from '@/components/tropical_wind'
import Disaster_wea from '@/components/Disaster_wea'
import Forecast_pro from '@/components/Forecast_pro'
import op_support from '@/components/op_support'
import Climate_pro from '@/components/Climate_pro'
import Ocean_view from '@/components/Ocean_view'
// 实况分析***********************************************
import groundanalyze from '@/components/shikuang_children/groundanalyze'
import highairanalyze from '@/components/shikuang_children/highairanalyze'
import armyanalyze from '@/components/shikuang_children/armyanalyze'
import stationanalyze from '@/components/shikuang_children/stationanalyze'

// 数值预报***********************************************
import Synthesis from '@/components/Value_children/Synthesis'
import alone from '@/components/Value_children/alone'
import Pro_display from '@/components/Value_children/Pro_display'
import Pattern_test from '@/components/Value_children/Pattern_test'
import Multi_mode from '@/components/Value_children/Multi-mode'

//图形图像************************************************
import facsimile from '@/components/image_children/facsimile'
import lightning from '@/components/image_children/lightning'
import satellitecloud from '@/components/image_children/satellitecloud'
import thematic from '@/components/image_children/thematic'
import weatherradar from '@/components/image_children/weatherradar'

//历史天气************************************************
import historyweather from '@/components/His_weather/historyweather'


//热带气旋
import tropical from '@/components/Tropical_wind/tropical'


//灾害天气
import disasterweather from '@/components/Disaster_wea/disasterweather'

//预报产品
import compositemapping from '@/components/Forecast_pro/compositemapping'

//作战保障
import hitguarantee from '@/components/op_support/hitguarantee'

//气候产品
import climateproducts from '@/components/Climate_pro/climateproducts'

// 海洋产品***********************************************
import Oceandata from '@/components/Ocean_view/Oceandata'


Vue.use(Router)

export default new Router({
  linkActiveClass: 'top_active',
  history: true,
  routes: [{
      path: '/',
      redirect: '/components/Live_analysis',
      component: Live_analysis
    },
    {
      path: '/components/Live_analysis',
      name: 'Live_analysis',
      component: Live_analysis,
      children: [
        {
          path: '/',
          redirect: '/components/shikuang_children/highairanalyze'
        },
        {
          path: '/components/shikuang_children/groundanalyze',
          component: groundanalyze
        },
        {
          path: '/components/shikuang_children/highairanalyze',
          component: highairanalyze
        },
        {
          path: '/components/shikuang_children/armyanalyze',
          component: armyanalyze
        },
        {
          path: '/components/shikuang_children/stationanalyze',
          component: stationanalyze
        },
      ]
    },//地面实况
    {
      path: '/components/Value_forecast',
      name: 'Value_forecast',
      component: Value_forecast,
      children: [
        {
          path: '/',
          redirect: '/components/Value_children/Synthesis'
        },
        {
          path: '/components/Value_children/Synthesis',
          component: Synthesis
        },
        {
          path: '/components/Value_children/alone',
          component: alone
        },
        {
          path: '/components/Value_children/Pro_display',
          component: Pro_display
        },
        {
          path: '/components/Value_children/Pattern_test',
          component: Pattern_test
        },
        {
          path: '/components/Value_children/Multi-mode',
          component: Multi_mode
        }
      ]
    },//数值预报
    {
      path: '/components/image',
      name:'image',
      component: image,
      children: [
        {
          path: '/',
          redirect: '/components/image_children/satellitecloud'
        },
        {
          path: '/components/image_children/satellitecloud',
          component: satellitecloud
        },
        {
          path: '/components/image_children/weatherradar',
          component: weatherradar
        },
        {
          path: '/components/image_children/lightning',
          component: lightning
        },
        {
          path: '/components/image_children/facsimile',
          component: facsimile
        },
        {
          path: '/components/image_children/thematic',
          component: thematic
        }
      ]
    },//图形图像
    {
      path: '/components/His_weather',
      component: His_weather,
      children: [
        {
          path: '/',
          redirect: '/components/His_weather/historyweather'
        },
        {
          path: '/components/His_weather/historyweather',
          component: historyweather
        },
      ]
    },//历史天气
    {
      path: '/components/tropical_wind',
      component: tropical_wind,
      children: [
        {
          path: '/',
          redirect: '/components/Tropical_wind/tropical'
        },
        {
          path: '/components/Tropical_wind/tropical',
          component: tropical
        },
      ]
    },//热带气旋
    {
      path: '/components/Disaster_wea',
      component: Disaster_wea,
      children: [
        {
          path: '/',
          redirect: '/components/Disaster_wea/disasterweather'
        },
        {
          path: '/components/Disaster_wea/disasterweather',
          component: disasterweather
        },
      ]
    },//灾害天气
    {
      path: '/components/Forecast_pro',
      component: Forecast_pro,
      children: [
        {
          path: '/',
          redirect: '/components/Forecast_pro/compositemapping'
        },
        {
          path: '/components/Forecast_pro/compositemapping',
          component: compositemapping
        },
      ]
    },//预报产品
    {
      path: '/components/op_support',
      component: op_support,
      children: [
        {
          path: '/',
          redirect: '/components/op_support/hitguarantee'
        },
        {
          path: '/components/op_support/hitguarantee',
          component: hitguarantee
        },
      ]
    },//作战保障
    {
      path: '/components/Climate_pro',
      component: Climate_pro,
      children: [
        {
          path: '/',
          redirect: '/components/Climate_pro/climateproducts'
        },
        {
          path: '/components/Climate_pro/climateproducts',
          component: climateproducts
        },
      ]
    },//气候产品
    {
      path: '/components/Ocean_view',
      name: 'Ocean_view',
      component: Ocean_view,
      children: [
        {
          path: '/',
          redirect: '/components/Ocean_view/Oceandata'
        },
        {
          path: '/components/Ocean_view/Oceandata',
          component: Oceandata
        },
        {
          path: '/components/Value_children/alone',
          component: alone
        },
        {
          path: '/components/Value_children/Pro_display',
          component: Pro_display
        },
        {
          path: '/components/Value_children/Pattern_test',
          component: Pattern_test
        },
        {
          path: '/components/Value_children/Multi-mode',
          component: Multi_mode
        }
      ]
    },//海洋产品
  ]
})
