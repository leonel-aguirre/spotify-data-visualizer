import React, { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"

const PieChart = () => {
  const ctx = useRef(null)

  useEffect(() => {
    let chart

    if (ctx.current) {
      chart = new Chart(ctx.current, {
        type: "doughnut",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
      })
    }

    return () => chart.destroy()
  }, [ctx])

  return (
    <div className="pie-chart">
      <canvas ref={ctx}></canvas>
    </div>
  )
}

export default PieChart
