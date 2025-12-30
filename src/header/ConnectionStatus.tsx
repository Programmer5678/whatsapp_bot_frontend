import React, { useEffect, useState, Component } from 'react';
import { RefreshCw, QrCode } from 'lucide-react';
import { api } from '../shared/api/client';
import { ConnectionStateResponse } from './types';
import { Button } from '../shared/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog';
import { cn, formatDate } from '../shared/utils/helpers';
/**
 * ConnectionStatus Component
 *
 * Displays WhatsApp connection status in the header.
 * Always visible at the top of the application.
 *
 * Features:
 * - Real-time connection status indicator (green/red)
 * - Last check timestamp
 * - Refresh button to re-check connection
 * - Reconnect button that displays QR code modal
 * - Handles three states: connected, not_connected, evolution_connection_error
 */
export function ConnectionStatus() {
  const [status, setStatus] = useState<ConnectionStateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const fetchStatus = async () => {
    setLoading(true);
    try {
      const data = await api.getConnectionState();
      setStatus(data);
    } catch (error) {
      console.error('Failed to fetch status:', error);
      setStatus({
        status: 'evolution_connection_error'
      });
    } finally {
      setLoading(false);
    }
  };
  const handleReconnect = async () => {
    setLoading(true);
    try {
      const {
        qr_code
      } = await api.reconnect();
      setQrCode(qr_code);
      setShowQr(true);
      fetchStatus();
    } catch (error) {
      console.error('Failed to reconnect:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);
  const getStatusColor = () => {
    switch (status?.status) {
      case 'connected':
        return 'bg-green-500';
      case 'not_connected':
        return 'bg-red-500';
      default:
        return 'bg-red-500';
    }
  };
  const getStatusText = () => {
    switch (status?.status) {
      case 'connected':
        return 'Connected';
      case 'not_connected':
        return 'Not Connected';
      case 'evolution_connection_error':
        return 'Connection Error';
      default:
        return 'Unknown Status';
    }
  };
  return <div className="flex flex-col gap-2 p-4 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={cn('h-3 w-3 rounded-full shadow-sm ring-2 ring-offset-2 ring-transparent transition-all', getStatusColor())} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900 flex items-center gap-2">
                {getStatusText()}
                {status?.status === 'evolution_connection_error' && <span className="text-xs font-normal text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    API Unreachable
                  </span>}
              </span>
              <span className="text-xs text-slate-500">
                As of {formatDate(new Date().toISOString())}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchStatus} disabled={loading} className="gap-2">
            <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} />
            Refresh
          </Button>

          <Button variant="default" size="sm" onClick={handleReconnect} disabled={loading} className="gap-2">
            <QrCode className="h-3.5 w-3.5" />
            Reconnect
          </Button>
        </div>
      </div>

      <Dialog open={showQr} onOpenChange={setShowQr}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code to Connect</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg">
            {qrCode ? <img src={`data:image/png;base64,${qrCode}`} alt="WhatsApp Connection QR Code" className="w-64 h-64 object-contain" /> : <div className="flex flex-col items-center gap-2 text-slate-500">
                <RefreshCw className="h-8 w-8 animate-spin" />
                <p>Generating QR Code...</p>
              </div>}
          </div>
        </DialogContent>
      </Dialog>
    </div>;
}