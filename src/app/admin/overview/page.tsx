"use client";

import StatCard from "../components/StatCard";
import { formatCurrency } from "../../helpers";
import { useReportStatistics } from "../../hooks/report-statistics-hooks";


const AdminPage = () => {

  const { data, isLoading } = useReportStatistics("");
  return (
      <div className="">
        <h1 className="text-2xl font-semibold font-inter text-primary">Report</h1>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title={"TOTAL AMOUNT"}
            value={
              formatCurrency(data?.totalAmount, 'EUR')
            }
            icon={"/images/cart.png"}
            isLoading={isLoading}
          />
          <StatCard
            title={"NO OF APPOINTMENTS"}
            value={data?.numOfAppointments || 0}
            icon={"/images/box.png"}
            isLoading={isLoading}
          />
          <StatCard
            title={"TOTAL CLIENTS"}
            value={data?.numOfClients || 0}
            icon={"/images/money.png"}
            isLoading={isLoading}
          />
        </div>
      </div>
  )
}

export default AdminPage;