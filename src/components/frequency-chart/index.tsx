import React, { ReactElement } from 'react'
import { Bar } from 'react-chartjs-2'
import { useTheme } from '../../hooks/theme'

const FrequencyChart: React.FC = (): ReactElement => {

  const { theme } = useTheme()

  let fontColor = '#233044'
  if (theme === 'dark') {
    fontColor = '#F7F9FC'
  }

  const config = {
    labels: ['Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'],
    datasets: [
      {
        backgroundColor: '#2593BE',
        data: [55, 59, 65, 67, 61, 69]
      }
    ]
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Bar
        data={config}
        options={{
          title:{
            display: true,
            text: 'Últimos acessos',
            fontSize: 22,
            fontColor,
          },
          legend: {
            display: false,
            labels: {
              fontColor,
            },
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
              },
              ticks: {
                fontColor
              }
            }],
            yAxes: [{
              ticks: {
                fontColor
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: false
        }}
        height={null}
        width={null}
      />
    </div>
  )
}

export default FrequencyChart
