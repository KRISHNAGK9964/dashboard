import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  dboard_mark,
  bmarks_mark,
  schedule_mark,
  user_mark,
  setting_mark,
  search_mark,
  bell,
  avatar,
  revenue,
  transaction,
  like,
  people,
  arrowd,
  arrowr,
} from "../public";
import dynamic from "next/dynamic";
import useGoogleIdentify from "../hooks/useGoogleIdentify.jsx";
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface dashboardProps {}

const Dashboard: React.FC<dashboardProps> = ({}) => {
  const nextAuthOpt = {
    redirect: false,
  };
  const googleOpt = {
    prompt_parent_id: "oneTap",
    isOneTap: true,
  };
  const { isSignedIn } = useGoogleIdentify({
    nextAuthOpt,
    googleOpt,
  });

  const{data: session, status} = useSession();
  const [options, setOptions] = useState({
    chart: {
      id: "spline-chart",
      background: "#FFFFFF",
      toolbar: {
        show: false,
      },
      width: "100%",
    },
    xaxis: {
      categories: [0, "Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    },
    stroke: {
      curve: "smooth" as "smooth",
    },
    colors: ["#E9A0A0", "#9BDD7C"],
    legend: {
      position: "top" as "top",
      horizontalAlign: "right" as "right",
    },
    subtitle: {
      text: "May-June 2021🔽",
      margin: 0,
      offsetX: 30,
      style: {
        color: "#858585",
      },
    },
    title: {
      text: "Activities",
      offsetX: 30,
      margin: 0,
      floating: true,
      style: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#000000",
      },
    },
  });
  const [series, setSeries] = useState([
    {
      name: "Guest",
      data: [200, 390, 200, 300, 220, 440],
    },
    {
      name: "User",
      data: [100, 420, 150, 450, 180, 270],
    },
  ]);

  const [chartData, setChartData] = useState({
    length: 3,
    series: [14, 31, 55],
    options: {
      chart: {
        type: "pie" as "pie",
        width: "100%",
      },
      labels: ["Super Hoodies", "Custom Short", "Basic Tees"],
      colors: ["#EE8484", "#F6DC7D", "#98D89E"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
    },
  });
  const router = useRouter();
  const [pieColors, setPieColors] = useState(["#EE8484", "#F6DC7D", "#98D89E"]);

  useEffect(()=>{
    if(status!=='loading' && !session?.user){
      router.replace('/signin');
    }
  },[session])
  
  // if(!session?.user?.image)return null;
  return (
    <div className="min-h-screen flex p-4 bg-[#F5F5F5] min-w-max">
      {!isSignedIn ? <div id="oneTap" className="fixed right-0 z-50" /> : null}
      {/* sidebar */}
      <div className="relative  bg-black rounded-[30px] px-8 pr-16">
        <p className="font-bold text-4xl text-white my-14 ">Board.</p>
        <div className="w-full flex flex-col space-y-4 ">
          <div className="flex space-x-2 items-center  text-white">
            <div className="relative w-4 h-4">
              <Image src={dboard_mark} fill className="" alt={""} />
            </div>
            <p className="text-lg font-bold">Dashboard</p>
          </div>
          <div className="flex space-x-2 items-center  text-white">
            <div className="relative w-4 h-4">
              <Image src={bmarks_mark} fill className="" alt={""} />
            </div>
            <p className="text-lg font-bold">Transactions</p>
          </div>
          <div className="flex space-x-2 items-center  text-white">
            <div className="relative w-4 h-4">
              <Image src={schedule_mark} fill className="" alt={""} />
            </div>
            <p className="text-lg font-bold">Schedules</p>
          </div>
          <div className="flex space-x-2 items-center  text-white">
            <div className="relative w-4 h-4">
              <Image src={user_mark} fill className="" alt={""} />
            </div>
            <p className="text-lg font-bold">Users</p>
          </div>
          <div className="flex space-x-2 items-center  text-white">
            <div className="relative w-4 h-4">
              <Image src={setting_mark} fill className="" alt={""} />
            </div>
            <p className="text-lg font-bold">Settings</p>
          </div>
        </div>

        <div className=" absolute bottom-0 text-white text-sm font-normal space-y-2 py-10">
          <p>Help</p>
          <p>Contact Us</p>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1 p-4 space-y-10">
        {/* header */}
        <div className=" flex justify-between items-center">
          <p className="font-bold text-2xl">Dashboard</p>
          <div className="flex space-x-12 items-center">
            <div className="relative overflow-hidden flex items-center rounded-xl px-3 p-1 bg-white">
              <input
                type="text"
                className="inset-0 outline-none"
                placeholder="Search.."
              />
              <Image src={search_mark} className="" alt="🔍" />
            </div>
            <div className="relative w-5 h-5 ">
              <Image src={bell} fill className="" alt="" />
            </div>
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-500">
              {(session?.user?.image) && <Image src={session?.user?.image} fill className="" alt="" />}
            </div>
          </div>
        </div>
        {/* cards */}
        <div className="flex justify-between space-x-4 ">
          <div className="p-8 bg-[#DDEFE0] rounded-[30px] w-60 space-y-1 ">
            <div className="flex flex-row-reverse ">
              <Image src={revenue} className="h-6 w-7" alt="" />
            </div>
            <p className="font-normal text-sm">Total Revenues</p>
            <p className="font-bold text-2xl">$2,129,430</p>
          </div>
          <div className="p-8 bg-[#F4ECDD] rounded-[30px] w-60 space-y-1 ">
            <div className="flex flex-row-reverse ">
              <Image src={transaction} className="h-6 w-5" alt="" />
            </div>
            <p className="font-normal text-sm">Total Transactions</p>
            <p className="font-bold text-2xl">1,520</p>
          </div>
          <div className="p-8 bg-[#EFDADA] rounded-[30px] w-60 space-y-1 ">
            <div className="flex flex-row-reverse ">
              <Image src={like} className="h-6 w-6" alt="" />
            </div>
            <p className="font-normal text-sm">Total Likes</p>
            <p className="font-bold text-2xl">9,721</p>
          </div>
          <div className="p-8 bg-[#DEE0EF] rounded-[30px] w-60 space-y-1 ">
            <div className="flex flex-row-reverse ">
              <Image src={people} className="h-6 w-8" alt="" />
            </div>
            <p className="font-normal text-sm">Total Users</p>
            <p className="font-bold text-2xl">892</p>
          </div>
        </div>
        {/* Line chart */}

        <div className="p-6 px-4 bg-white rounded-3xl overflow-hidden">
          {typeof window !== "undefined" && (
            <Chart options={options} series={series} type="line" height="300" />
          )}
        </div>

        {/* cards charts */}
        <div className="flex justify-between space-x-10">
          <div className="rounded-[20px] max-h-fit bg-white p-6 space-y-4 w-1/2">
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">Top products</p>
              <p className="text-xs text-[#858585] ">
                May-June 2021 <Image src={arrowd} className="inline" alt="" />{" "}
              </p>
            </div>
            <div className="flex items-center ">
              <div className="">
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="pie"
                  height="100%"
                />
              </div>
              <div className="flex flex-1 h-auto flex-col justify-between space-y-2">
                {chartData.series.map((value, index) => (
                  <div key={index} className="flex space-x-4 ">
                    <div className="p-1.5">
                      <div
                        className={`w-3 h-3 rounded-full `}
                        style={{ backgroundColor: pieColors[index] }}
                      ></div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">
                        {chartData.options.labels[index]}
                      </p>
                      <p className="text-xs text-[#858585]">{value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white p-6 w-1/2 space-y-6">
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">Today's schedule</p>
              <p className="text-xs text-[#858585] ">
                See All <Image src={arrowr} className="inline" alt="" />{" "}
              </p>
            </div>

            <div className="p-2 border-l-4 border-l-[#9BDD7C]">
              <p className=" font-bold text-sm text-[#666666]">
                Meeting with suppliers from Kuta Bali
              </p>
              <p className=" text-xs text-[#999999] ">14.00 - 15.00</p>
              <p className=" text-xs text-[#999999] ">
                at Sunset Road, Kuta , Bali
              </p>
            </div>
            <div className="p-2 border-l-4 border-l-[#6972C3]">
              <p className=" font-bold text-sm text-[#666666]">
                Check operation at Giga Factory 1
              </p>
              <p className=" text-xs text-[#999999] ">18.00 - 20.00</p>
              <p className=" text-xs text-[#999999] ">at Central Jakarta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

