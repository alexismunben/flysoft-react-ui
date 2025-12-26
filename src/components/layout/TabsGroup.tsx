import React, { useState, useEffect, useMemo, createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";

export interface Tab {
  id: string | number;
  label: string;
}

export interface TabsGroupProps {
  children?: React.ReactNode;
  tabs: Tab[];
  paramName?: string;
  headerNode?: React.ReactNode;
  onChangeTab?: (selectedTab: string) => void;
}

interface TabsContextType {
  activeTab: string | number;
  setActiveTab: (tab: string | number) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabPanel must be used within TabsGroup");
  }
  return context;
};

export const TabsGroup: React.FC<TabsGroupProps> = ({
  children,
  tabs,
  paramName,
  headerNode,
  onChangeTab,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = tabs[0]?.id?.toString() || "";
  
  // Obtener el tab activo desde URL params si paramName está definido, sino desde estado local
  const urlTab = paramName ? searchParams.get(paramName) : null;
  const initialTab = urlTab || defaultTab;
  
  const [activeTab, setActiveTabState] = useState<string | number>(initialTab);

  // Sincronizar con URL params cuando cambian
  useEffect(() => {
    if (paramName && urlTab) {
      setActiveTabState(urlTab);
    }
  }, [paramName, urlTab]);

  const setActiveTab = (tab: string | number) => {
    setActiveTabState(tab);
    
    // Actualizar URL params si paramName está definido
    if (paramName) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(paramName, tab.toString());
      setSearchParams(newSearchParams, { replace: true });
    }
    
    // Llamar al callback si está definido
    if (onChangeTab) {
      onChangeTab(tab.toString());
    }
  };

  const contextValue = useMemo(
    () => ({ activeTab, setActiveTab }),
    [activeTab]
  );

  const handleTabClick = (tabId: string | number) => {
    setActiveTab(tabId);
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className="w-full font-[var(--font-default)]">
        {/* Header con tabs y headerNode */}
        <div className="flex items-center justify-between border-b border-[var(--color-border-default)]">
          {/* Tabs alineados a la izquierda */}
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab.toString() === tab.id.toString();
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    px-4 py-2 text-sm font-medium transition-colors cursor-pointer
                    border-b-2 -mb-[1px]
                    ${
                      isActive
                        ? "text-[var(--color-primary)] border-[var(--color-primary)]"
                        : "text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-default)]"
                    }
                  `}
                  aria-selected={isActive}
                  role="tab"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          
          {/* HeaderNode alineado a la derecha */}
          {headerNode && (
            <div className="flex items-center">
              {headerNode}
            </div>
          )}
        </div>

        {/* Contenido de los tabs */}
        <div className="mt-4">
          {children}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

