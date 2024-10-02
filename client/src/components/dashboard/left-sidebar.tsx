"use client";

import React, { useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { useDashboardStore } from "@/store/dashboardStore";

export default function LeftSidebar() {
  const { isSidebarOpen, toggleSidebar, tabKey, setTabKey } = useDashboardStore(
    (state) => state,
  );
  if (!isSidebarOpen)
    return (
      <button
        className="w-[50px] h-[50px] absolute bg-primary text-white"
        onClick={() => toggleSidebar()}
      >
        Open
      </button>
    );

  useEffect(() => {
    console.log(tabKey);
  }, [tabKey]);
  return (
    <section
      className={`${!isSidebarOpen && "hidden"} w-[250px] flex bg-purple-300`}
    >
      <div className="flex w-full flex-col flex-1 bg-neutral p-3">
        <Tabs
          aria-label="Navigation"
          isVertical
          className="contents"
          variant="light"
          classNames={{
            tab: "w-full py-5",
            tabList: "w-full flex-1 h-full",
            tabContent: "w-full",
            cursor: "pointer",
            wrapper: "h-full",
          }}
          onSelectionChange={(index) => setTabKey(index as string)}
        >
          <Tab key="dashboard" title="Dashboard" />
          <Tab key="patient:new" title="New Patient" />
          <Tab key="patient:all" title="All Patients" />
        </Tabs>
      </div>
    </section>
  );
}
