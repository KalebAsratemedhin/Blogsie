import { useState } from 'react';

const TabSelector = ({tabs, contents}: {tabs: string[], contents: React.ReactNode[]}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-4 my-2">
      <div className="flex border-b border-custom-faint-white">
        
        {
          tabs.map((tab, index) => {
            return (
              <button
                key={index}
                className={`py-2 px-4  focus:outline-none
                ${
                  activeTab === index ? 'border-b-2 border-blue-500 text-blue-600' : 'text-blue-300'
                }
                `}
                onClick={() => handleTabClick(index)}
                >
                {tab}
              </button>

            )
          })
         
        }
      </div>

      <div className="">
        {contents[activeTab]}
       
      </div>
    </div>
  );
}

export default TabSelector