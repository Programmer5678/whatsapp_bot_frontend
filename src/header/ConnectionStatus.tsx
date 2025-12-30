import React, { useEffect, useState } from 'react';
import { RefreshCw, QrCode, XCircle } from 'lucide-react';
import { api } from '../shared/api/client';
import { ConnectionStateResponse } from './types';
import { Button } from '../shared/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/Dialog';
import { formatDate } from '../shared/utils/helpers';
import './ConnectionStatus.css';
export function ConnectionStatus() {
  const [status, setStatus] = useState<ConnectionStateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrError, setQrError] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [apiKey, setApiKey] = useState('');
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
  const handleConnectSubmit = async () => {
    setLoading(true);
    setQrError(false);
    try {
      const {
        qr_code
      } = await api.connect(phoneNumber, apiKey);
      if (qr_code === '') {
        setQrError(true);
        setQrCode(null);
      } else {
        setQrCode(qr_code);
        setQrError(false);
      }
      setShowConnectForm(false);
      setShowQr(true);
    } catch (error) {
      console.error('Failed to reconnect:', error);
      setQrError(true);
      setQrCode(null);
      setShowConnectForm(false);
      setShowQr(true);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseQr = () => {
    setShowQr(false);
    setQrCode(null);
    setQrError(false);
    fetchStatus(); // Refresh after closing
  };
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);
  const getStatusColor = () => {
    return status?.status === 'connected' ? 'connection-status__dot--connected' : 'connection-status__dot--error';
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
  return <div className="connection-status">
      <div className="connection-status__row">
        <div className="connection-status__info">
          <div className="connection-status__indicator">
            <div className={`connection-status__dot ${getStatusColor()}`} />
            <div className="connection-status__details">
              <span className="connection-status__text">
                {getStatusText()}
                {status?.status === 'evolution_connection_error' && <span className="connection-status__badge">
                    API Unreachable
                  </span>}
              </span>
              <span className="connection-status__timestamp">
                As of {formatDate(new Date().toISOString())}
              </span>
            </div>
          </div>
        </div>

        <div className="connection-status__actions">
          <Button variant="outline" size="sm" onClick={fetchStatus} disabled={loading}>
            <RefreshCw size={14} className={loading ? 'button__icon--spinning' : ''} style={{
            marginRight: '0.5rem'
          }} />
            Refresh
          </Button>

          <Button variant="default" size="sm" onClick={() => setShowConnectForm(true)} disabled={loading}>
            <QrCode size={14} style={{
            marginRight: '0.5rem'
          }} />
            Reconnect
          </Button>
        </div>
      </div>

      {/* Connect Form Modal */}
      <Dialog open={showConnectForm} onOpenChange={setShowConnectForm}>
        <DialogContent>
          <DialogClose onClose={() => setShowConnectForm(false)} />
          <DialogHeader>
            <DialogTitle>Connect WhatsApp</DialogTitle>
          </DialogHeader>
          <form className="connect-form" onSubmit={e => {
          e.preventDefault();
          handleConnectSubmit();
        }}>
            <div className="connect-form__field">
              <label className="connect-form__label">Phone Number</label>
              <input type="text" className="connect-form__input" placeholder="972523323235" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
            </div>
            <div className="connect-form__field">
              <label className="connect-form__label">API Key</label>
              <input type="text" className="connect-form__input" placeholder="Enter API key" value={apiKey} onChange={e => setApiKey(e.target.value)} required />
            </div>
            <div className="connect-form__actions">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowConnectForm(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm" disabled={loading}>
                {loading ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={showQr} onOpenChange={handleCloseQr}>
        <DialogContent>
          <DialogClose onClose={handleCloseQr} />
          <DialogHeader>
            <DialogTitle>
              {qrError ? 'Connection Failed' : 'Scan QR Code to Connect'}
            </DialogTitle>
          </DialogHeader>
          <div className="qr-modal__content">
            {qrError ? <div className="qr-modal__error">
                <XCircle className="qr-modal__error-icon" />
                <p>Failed to generate QR code. Please try again.</p>
              </div> : qrCode ? <img src={qrCode} alt="WhatsApp Connection QR Code" className="qr-modal__image" /> : <div className="qr-modal__loading">
                <RefreshCw size={32} className="button__icon--spinning" />
                <p>Generating QR Code...</p>
              </div>}
          </div>
        </DialogContent>
      </Dialog>
    </div>;
}