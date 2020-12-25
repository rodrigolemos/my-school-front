import React, { ReactElement } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../hooks/theme';

const PerformanceChart: React.FC = (): ReactElement => {
  const { theme } = useTheme();

  let fontColor = '#233044';
  if (theme === 'dark') {
    fontColor = '#F7F9FC';
  }

  const config = {
    labels: ['Iniciado', 'Matrículado', 'Finalizado'],
    datasets: [
      {
        backgroundColor: ['#2196F3', '#FF9800', '#4CAF50'],
        border: 0,
        data: [20, 59, 65]
      }
    ]
  };

  return (
    <div style={{ width: '75%', height: '100%', display: 'flex', justifyContent: 'center' }}>
      <Doughnut
        data={config}
        options={{
          title: {
            display: true,
            text: 'Meus cursos',
            fontSize: 22,
            fontColor
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontColor,
              boxWidth: 10,
              padding: 15
            }
          },
          elements: {
            arc: {
              borderWidth: 0
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }}
        height={null}
        width={null}
      />
    </div>
  );
};

export default PerformanceChart;
