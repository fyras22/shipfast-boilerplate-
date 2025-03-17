'use client';

import React, { useState, useEffect } from 'react';
import { Bell, X, ShieldAlert, Calendar, Download, RefreshCw } from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  date: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

// Mock function to fetch notifications
const fetchNotifications = async (): Promise<Notification[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: 'notif_1',
      type: 'warning',
      title: 'License Expiring Soon',
      message: 'Your Professional license will expire in 15 days. Renew now to maintain access.',
      date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: false,
      action: {
        label: 'Renew License',
        url: '/pricing',
      },
    },
    {
      id: 'notif_2',
      type: 'info',
      title: 'New Version Available',
      message: 'ShipFast v1.2.0 is now available with new features and bug fixes.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: false,
      action: {
        label: 'Download Now',
        url: '/dashboard/downloads',
      },
    },
    {
      id: 'notif_3',
      type: 'success',
      title: 'License Activated',
      message: 'Your Professional license has been successfully activated.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      read: true,
    }
  ];
};

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to load notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const refreshNotifications = async () => {
    setLoading(true);
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to refresh notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'info':
        return <Download className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <Calendar className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 overflow-hidden bg-white rounded-md shadow-lg w-80 dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="flex space-x-2">
              <button
                onClick={refreshNotifications}
                className="p-1 text-gray-500 rounded-full hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-gray-100"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`relative p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 ${
                      notification.read ? 'opacity-75' : 'bg-blue-50 dark:bg-blue-900/20'
                    }`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatRelativeTime(notification.date)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                        {notification.action && (
                          <a 
                            href={notification.action.url}
                            className="inline-block mt-2 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {notification.action.label} →
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      aria-label="Delete notification"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="absolute bottom-2 right-4 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 