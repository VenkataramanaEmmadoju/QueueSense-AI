import React from 'react';
import { Bell, X, CheckCheck, AlertCircle, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { notifications, markNotificationAsRead, clearAllNotifications } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/50 backdrop-blur-sm animate-in fade-in">
      <div 
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-navy-100 flex items-center justify-between bg-medical-50/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-medical-100 flex items-center justify-center text-medical-700">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-sm">{t('modal.notifications_title', 'Notifications & Alerts')}</h3>
              <p className="text-[11px] text-navy-500">Live queue updates and clinical status</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-navy-400 hover:text-navy-700 rounded-full hover:bg-navy-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-navy-50 border-b border-navy-100 flex items-center justify-between text-xs">
          <span className="text-navy-500 font-medium">Recent Activity</span>
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-medical-700 hover:text-medical-800 font-semibold flex items-center space-x-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{t('modal.clear_all', 'Clear all')}</span>
            </button>
          )}
        </div>

        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-navy-400">
              <Bell className="w-10 h-10 mx-auto text-navy-300 stroke-1 mb-2" />
              <p className="text-sm font-semibold text-navy-600">{t('modal.no_notifications', 'No New Notifications')}</p>
              <p className="text-xs text-navy-400 mt-1">Token queue callouts and emergency updates will appear here.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  notif.read 
                    ? 'border-navy-100 bg-white opacity-70' 
                    : 'border-medical-200 bg-medical-50/60 shadow-soft-sm'
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    notif.type === 'emergency' 
                      ? 'bg-rose-100 text-rose-600' 
                      : notif.type === 'token' 
                      ? 'bg-teal-100 text-teal-700' 
                      : notif.type === 'civic' 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-navy-100 text-navy-600'
                  }`}>
                    {notif.type === 'emergency' ? <AlertCircle className="w-4 h-4" /> :
                     notif.type === 'token' ? <CheckCircle2 className="w-4 h-4" /> :
                     <Info className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-navy-900 truncate">{notif.title}</h4>
                      <span className="text-[10px] text-navy-400 shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-xs text-navy-600 mt-0.5 leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
