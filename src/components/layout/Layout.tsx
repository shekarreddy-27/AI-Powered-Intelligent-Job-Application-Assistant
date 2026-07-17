import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Bell, Search, CheckCircle } from "lucide-react"

interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: number;
  createdAt: string;
}

interface LayoutProps {
  onSignOut?: () => void;
}

export function Layout({ onSignOut }: LayoutProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/notifications')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotifications(data);
        }
      })
      .catch(err => console.error("Failed to fetch notifications:", err));
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/notifications/${id}/read`, { method: 'POST' });
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center justify-between px-8 relative z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs, applications, or tasks..."
                className="w-full bg-slate-100 dark:bg-slate-900 border-transparent focus:border-indigo-500 focus:bg-transparent rounded-md pl-9 pr-4 py-2 text-sm outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative p-2 text-muted-foreground hover:bg-accent rounded-full transition-colors"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600"></span>
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border shadow-lg rounded-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b bg-slate-50 dark:bg-slate-800">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif.id} className="p-4 border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h4 className="text-sm font-medium">{notif.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                            </div>
                            <button 
                              onClick={() => markAsRead(notif.id)}
                              className="text-indigo-600 hover:text-indigo-800 p-1"
                              title="Mark as read"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm hover:ring-2 hover:ring-indigo-500 transition-all focus:outline-none"
              >
                JD
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border shadow-lg rounded-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b bg-slate-50 dark:bg-slate-800">
                    <p className="text-sm font-medium">Jane Doe</p>
                    <p className="text-xs text-muted-foreground truncate">jane.doe@example.com</p>
                  </div>
                  <div className="py-1">
                    <button 
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Change Account
                    </button>
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        if (onSignOut) onSignOut();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8 relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
