import React, { ReactElement } from 'react';
import { Doughnut } from 'react-chartjs-2';

export const DashboardChart: React.FC = (): ReactElement => {
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
        maintainAspectRatio: false,
        aspectRatio: 1
      }}
      height={null}
      width={null}
    />
  );
};
