import React from 'react';
import { X } from 'lucide-react';
import './Dialog.css';
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
export function Dialog({
  open,
  onOpenChange,
  children
}: DialogProps) {
  if (!open) return null;
  return <>
      <div className="dialog-overlay" onClick={() => onOpenChange(false)} />
      {children}
    </>;
}
export function DialogContent({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="dialog-content">{children}</div>;
}
export function DialogHeader({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="dialog-header">{children}</div>;
}
export function DialogTitle({
  children
}: {
  children: React.ReactNode;
}) {
  return <h2 className="dialog-title">{children}</h2>;
}
export function DialogClose({
  onClose
}: {
  onClose: () => void;
}) {
  return <button className="dialog-close" onClick={onClose}>
      <X size={16} />
      <span style={{
      position: 'absolute',
      width: 1,
      height: 1,
      overflow: 'hidden'
    }}>
        Close
      </span>
    </button>;
}