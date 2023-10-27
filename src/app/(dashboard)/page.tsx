"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import styles from "@/styles/Home.module.css";
import { Chart } from "primereact/chart";

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3, 9],
      borderColor: ["#7E57C2"],
      borderWidth: 3,
      borderDash: [5, 5],
      fill: false,
      pointRadius: 3,
      tension: 0.4,
    },
    {
      label: "Income",
      data: [1, 2, 5, 3, 12, 7, 15],
      backgroundColor: ["rgba(187,222,251,0.2)"],
      borderColor: ["#42A5F5"],
      borderWidth: 3,
      fill: true,
      tension: 0.4,
    },
    {
      label: "Expenses",
      data: [7, 12, 15, 5, 3, 13, 21],
      borderColor: ["#FFB300"],
      borderWidth: 3,
      fill: false,
      pointRadius: [4, 6, 4, 12, 8, 0, 4],
      tension: 0.4,
    },
    {
      label: "New Users",
      data: [3, 7, 2, 17, 15, 13, 19],
      borderColor: ["#66BB6A"],
      borderWidth: 3,
      fill: false,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  hover: {
    mode: "index",
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

const barChartData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Sales",
      data: [540, 325, 702, 620],
      backgroundColor: [
        "rgba(255, 159, 64, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgb(255, 159, 64)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
      ],
      borderWidth: 1,
    },
  ],
};
const barChartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Home() {
  // Distructuring props from our custom useAuthContext Hook
  const { setIsUserValid } = useAuthContext();

  useEffect(() => {
    setIsUserValid(true);
  }, []);

  return (
    <div className={`${styles["layout-dashboard"]}`}>
      <div className={`${styles["grid"]}`}>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className={`${styles["overview-box"]} ${styles["sales"]}`}>
            <i className={`${styles["overview-icon"]} pi pi-dollar`}></i>
            <span className={`${styles["overview-title"]}`}>Sales</span>
            <i
              className={`${styles["overview-arrow"]} pi pi-chevron-circle-up`}
            ></i>
            <div className={`${styles["overview-numbers"]}`}>$ 92,440</div>
            <div className={`${styles["overview-subinfo"]}`}>
              21% more than yesterday
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-6 xl:col-3">
          <div className={`${styles["overview-box"]} ${styles["views"]}`}>
            <i className={`${styles["overview-icon"]} pi pi-search`}></i>
            <span className={`${styles["overview-title"]}`}>Views</span>
            <i
              className={`${styles["overview-arrow"]} pi pi-chevron-circle-up`}
            ></i>
            <div className={`${styles["overview-numbers"]}`}>7029</div>
            <div className={`${styles["overview-subinfo"]}`}>
              2% more than yesterday
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-6 xl:col-3">
          <div className={`${styles["overview-box"]} ${styles["users"]}`}>
            <i className={`${styles["overview-icon"]} pi pi-users`}></i>
            <span className={`${styles["overview-title"]}`}>Users</span>
            <i
              className={`${styles["overview-arrow"]} pi pi-chevron-circle-up`}
            ></i>
            <div className={`${styles["overview-numbers"]}`}>9522</div>
            <div className={`${styles["overview-subinfo"]}`}>
              7% more than yesterday
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-6 xl:col-3">
          <div className={`${styles["overview-box"]} ${styles["checkin"]}`}>
            <i className={`${styles["overview-icon"]} pi pi-map-marker`}></i>
            <span className={`${styles["overview-title"]}`}>Check-Ins</span>
            <i
              className={`${styles["overview-arrow"]} pi pi-chevron-circle-up`}
            ></i>
            <div className={`${styles["overview-numbers"]}`}>4211</div>
            <div className={`${styles["overview-subinfo"]}`}>
              18% more than yesterday
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-6">
          <div
            className={`${styles["card"]} 
         ${styles["card-w-title"]}`}
          >
            <h5>Statistics</h5>
            <Chart type="line" data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="col-12 lg:col-6">
          <div
            className={`${styles["card"]} 
         ${styles["card-w-title"]}`}
          >
            <h5>Statistics</h5>
            <Chart type="bar" data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
