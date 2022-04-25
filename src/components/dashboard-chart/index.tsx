import React, { ReactElement } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../hooks/theme';

export const DashboardChart: React.FC = (): ReactElement => {
  const { theme } = useTheme();

  let fontColor = '#233044';
  if (theme === 'dark') {
    fontColor = '#F7F9FC';
  }

  const config = {
    labels: ['Iniciado', 'Matrículado'],
    datasets: [
      {
        backgroundColor: ['#F7FAFC', '#C05621'],
        border: 0,
        data: [74, 36]
      }
    ]
  };

  return (
    <Doughnut
      data={config}
      options={{
        legend: {
          display: false
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
  );
};
