"use client"

import { ResponsiveRadar } from "@nivo/radar"

interface RadarChartProps {
  data: Array<{ trait: string; score: number }>
  index: string
  categories: string[]
  valueFormatter: (value: number) => string
  colors: string[]
  className?: string
}

export function RadarChart({
  data,
  index,
  categories,
  valueFormatter,
  colors,
  className,
}: RadarChartProps) {
  return (
    <div className={className}>
      <ResponsiveRadar
        data={data}
        keys={categories}
        indexBy={index}
        valueFormat={valueFormatter}
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={colors}
        blendMode="multiply"
        motionConfig="wobbly"
      />
    </div>
  )
}

