import React, { ReactElement } from 'react'
import { Bar } from 'react-chartjs-2'

const StudentChart: React.FC = (): ReactElement => {

  const config = {
    labels: ['Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'],
    datasets: [
      {
        backgroundColor: '#2593BE',
        borderColor: '#03719C',
        borderWidth: 1,
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
            fontSize: 22
          },
          legend:{
            display: false
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

export default StudentChart
