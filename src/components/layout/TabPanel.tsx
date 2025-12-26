import React from "react";
import { useTabsContext } from "./TabsGroup";

export interface TabPanelProps {
  children?: React.ReactNode;
  tabId: string | number;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, tabId }) => {
  const { activeTab } = useTabsContext();
  const isActive = activeTab.toString() === tabId.toString();

  if (!isActive) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      className="w-full font-[var(--font-default)]"
    >
      {children}
    </div>
  );
};

