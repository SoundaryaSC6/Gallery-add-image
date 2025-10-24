import React, { useState } from 'react';

const AboutWidget = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About Me' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'recommended', label: 'Recommended' }
  ];

  const content = {
    about: `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.

I was born and raised in Albany, NY& have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9-10 AM. This is a...`,
    experiences: `Here are some of my key experiences and achievements:

• 3+ years at Salesforce as a Sales Representative
• Successfully managed 150+ client accounts
• Achieved 120% of sales quota in 2023
• Led team training sessions on new product features
• Certified in Salesforce Sales Cloud and Service Cloud`,
    recommended: `Based on your business needs, I recommend:

• Salesforce Sales Cloud for lead management
• Service Cloud for customer support
• Marketing Cloud for email campaigns
• Analytics Cloud for business insights

These solutions have helped similar companies increase their revenue by 25% on average.`
  };

  return (
    <div className="w-full rounded-3xl p-5 relative bg-gray-600 shadow-2xl">
      <div className="absolute left-3 top-4 w-6 h-6 rounded-full flex items-center justify-center">
        <span className="text-gray-300 text-base font-bold">?</span>
      </div>
      
      <div className="absolute left-3 top-14 w-6 h-6 grid grid-cols-3 gap-0.5 p-0.5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-400 rounded-sm"></div>
        ))}
      </div>
      
      <div className="ml-14">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] bg-gray-800 rounded-3xl p-1 mb-7 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-2 rounded-2xl text-base font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gray-700 text-white shadow-inner'
                  : 'text-gray-300 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="text-gray-300 text-base leading-relaxed h-32 overflow-y-auto pr-2 whitespace-pre-line">
          {content[activeTab]}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-b-3xl"></div>
    </div>
  );
};

export default AboutWidget;