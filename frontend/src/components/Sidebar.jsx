import { Plus, Search, PanelLeftClose } from 'lucide-react';
import logoImg from 'C:/blender UI/frontend/src/assets/Tessolve.png';

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeChatId,
  chatHistory,
  startNewChat,
  showSearchPage,
  setShowSearchPage,
  loadChat // <-- NEW PROP ADDED HERE
}) {

  // Safely separate the active chat from the older "Recent" chats
  const recentChats = chatHistory.filter(chat => String(chat.id) !== String(activeChatId));

  return (
    <aside 
      className={`fixed md:relative inset-y-0 left-0 z-30 bg-slate-50 dark:bg-slate-950 shadow-[4px_0_24px_rgba(0,0,0,0.05)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out flex flex-col h-screen ${
        sidebarOpen 
          ? 'w-72 translate-x-0 opacity-100' 
          : 'w-0 -translate-x-full md:translate-x-0 overflow-hidden opacity-0'
      }`}
    >
      
      {/* 1. FIXED LOGO HEADER */}
      <div className="flex items-center justify-center border-b border-slate-200 dark:border-slate-800 h-16 shrink-0 w-72 relative px-4">
        <img 
          src={logoImg} 
          alt="Tessolve Logo Layout" 
          className="h-12 w-auto object-contain max-w-[180px] cursor-pointer transition-opacity hover:opacity-90"
          onClick={startNewChat}
        />
        <button 
          onClick={() => setSidebarOpen(false)}
          className="absolute right-3 p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
          title="Close Sidebar"
        >
          <PanelLeftClose size={20} />
        </button>
      </div>

      {/* FIXED BUTTON ACTIONS */}
      <div className="p-4 space-y-3 w-72 shrink-0">
        
        {/* 'New Chat' Button */}
        <button 
          onClick={startNewChat} 
          className="w-full flex items-center justify-center gap-2 bg-brandOrange hover:bg-brandOrange-hover text-white py-3 rounded-lg font-medium transition-colors shadow-sm cursor-pointer text-center"
        >
          <Plus size={18} className="shrink-0" /> 
          <span>New Chat</span>
        </button>
        
        {/* 'Search Chat' Button */}
        <button 
          onClick={() => setShowSearchPage(true)} 
          className={`w-full flex items-center justify-center gap-2 border py-3 rounded-lg font-medium transition-colors shadow-sm cursor-pointer text-center ${
            showSearchPage 
              ? 'bg-brandBlue text-white border-brandBlue' 
              : 'bg-transparent border-brandBlue text-brandBlue dark:text-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <Search size={18} className="shrink-0" /> 
          <span>Search Chat</span>
        </button>
      </div>

      {/* recent chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 w-72 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
        
        {/* Active Workspace Sub-pane */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-900 dark:text-slate-400 mb-3 px-2 uppercase tracking-wider">
            Active Workspace
          </p>
          
          {activeChatId && !showSearchPage ? (
            <div className="px-3 py-2.5 text-sm rounded-lg bg-brandBlue text-white font-medium truncate shadow-sm cursor-default">
              {chatHistory.find(c => String(c.id) === String(activeChatId))?.title || "Active Conversation"}
            </div>
          ) : (
            <div className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500 italic">
              {showSearchPage ? "Browsing Chat History" : "No conversation active"}
            </div>
          )}
        </div>

        {/* Previous Chats Sub-pane */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-900 dark:text-slate-400 mb-3 px-2 uppercase tracking-wider">
            Previous Chats
          </p>
          
          <div className="space-y-0.1">
            {recentChats && recentChats.length > 0 ? (
              recentChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => loadChat(chat.id)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200 truncate cursor-pointer"
                  title={chat.title}
                >
                  {chat.title || "Untitled Chat"}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500 italic">
                No previous chats
              </div>
            )}
          </div>
        </div>
      </div> 
      {/* ^^^ SCROLLING CONTAINER ENDS HERE ^^^ */}

      {/*BOTTOM FOOTER */}
      <div className="shrink-0 w-72 p-2  bg-slate-50 dark:bg-slate-950">
        
        {/* Text Header & Percentage */}
        <div className="flex justify-between items-end mb-2">
    
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          TRAINING STATUS
          </span>
          {/*<span className="text-sm font-bold text-[#f47920]">
            20%
          </span> */}
        </div>
        
        {/* Static Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 mb-1.5 overflow-hidden">
          <div 
            className="bg-[#0082c8] h-full rounded-full transition-all duration-500" 
            style={{ width: '20%' }}
          ></div>
        </div>
        
        {/* Model Subtitle */}
        <span className="text-sm font-bold text-[#f47920]">
            20% training done
          </span>
        
      </div>

    </aside>
  );
}
