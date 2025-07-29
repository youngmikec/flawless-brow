"use client";

import StatCard from "./components/StatCard";


const AdminPage = () => {
  const reportStats = [
    {
      title: "TOTAL AMOUNT",
      value: 3456,
      icon: "/images/cart.png"
    },
    {
      title: "NO OF APPOINTMENTS",
      value: 20,
      icon: "/images/box.png"
    },
    {
      title: "TRANSACTIONS",
      value: 45,
      icon: "/images/money.png"
    }
  ]
  return (
      <div className="">
        <h1 className="text-2xl font-semibold font-inter text-primary">Report</h1>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            reportStats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))
          }
        </div>
      </div>
  )
}

export default AdminPage;