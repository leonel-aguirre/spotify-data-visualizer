import React, { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"

const PieChart = ({ labels, data, className = "" }) => {
  const ctx = useRef(null)

  useEffect(() => {
    let chart

    if (ctx.current) {
      chart = new Chart(ctx.current, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              data,
              borderWidth: 0,
              backgroundColor: [
                "#fc2453",
                "#3185fc",
                "#40f99b",
                "#9883e5",
                "#fce15a",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 0.5,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: {
                  size: 20,
                  weight: "800",
                  family:
                    '"Poppins", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell","Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                },
              },
            },
          },
        },
      })

      if (chart) {
        window.addEventListener("afterprint", () => {
          chart.resize()
        })
      }
    }

    return () => {
      chart.destroy()
    }
  }, [ctx, labels, data])

  return (
    <div className={`pie-chart ${className}`}>
      <canvas ref={ctx}></canvas>
    </div>
  )
}

export default PieChart
