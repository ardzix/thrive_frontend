import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface AreaChartProps {
  categories: number[] | string[];
  series: { name: string; data: number[] }[];
  customOptions?: ApexOptions;
  title?: string;
  onMonthChange?: (date: any) => void;
}

const AreaChart: React.FC<AreaChartProps> = ({
  categories,
  series,
  customOptions,
  title = "Data Overview",
  onMonthChange,
}) => {

  const defaultOptions: ApexOptions = {
    chart: {
      id: "area-chart",
      type: "area",
      zoom: { enabled: false },
      toolbar: { show: false },
      height: 350,
      width: "100%",
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: true },
    },
    grid: {
      yaxis: { lines: { show: false } },
    },
    tooltip: {
      shared: false,
      x: { format: "yyyy" },
      style: { fontSize: "14px", fontFamily: "Arial, sans-serif" },
      marker: { show: true },
      y: { formatter: (val) => `${val} units` },
    },
    legend: { 
        show: false ,
    //    floating: true, 
    },
  };

  const options = { ...defaultOptions, ...customOptions };

  return (
    <div className="relative w-full h-full">
      {/* Container untuk Title dan Month Picker */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{title}</h1>
        <RangePicker onChange={onMonthChange} picker="month" style={{ width: "200px" }} />
      </div>
      {/* Area Chart */}
      <ReactApexChart options={options} series={series} type="area" />
    </div>
  );
};

export default AreaChart;
