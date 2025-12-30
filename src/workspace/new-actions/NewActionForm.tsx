import React, { useState, Component } from 'react';
import { Plus, Send } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Card, CardContent } from './ui/Card';
import { api } from '../../shared/api/client';
type ActionType = 'raf0' | 'mavdak' | 'hakhana' | 'veadat_keva';
/**
 * NewActionForm Component
 *
 * Allows users to create new WhatsApp group automation actions.
 * Displays different form fields based on the selected action type.
 *
 * Action Types:
 * - raf0: Simple action with date and participants
 * - mavdak: Complex action with multiple fields including forms link
 * - hakhana: Action with date, deadline, and participants
 * - veadat_keva: Similar to hakhana with date, deadline, and participants
 *
 * Features:
 * - Dynamic form fields based on action type
 * - Form validation
 * - Success/error feedback
 * - Auto-reset on successful submission
 */
export function NewActionForm() {
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const getParticipants = () => {
        const raw = formData.get('group_participants') as string;
        return raw.split(',').map(p => p.trim()).filter(Boolean);
      };
      switch (selectedAction) {
        case 'raf0':
          await api.createRaf0({
            date: formData.get('date') as string,
            group_participants: getParticipants()
          });
          break;
        case 'mavdak':
          await api.createMavdak({
            base_date: formData.get('base_date') as string,
            deadline_mavdak_list: new Date(formData.get('deadline_mavdak_list') as string).toISOString(),
            forms_link: formData.get('forms_link') as string,
            iluzei_reaionot_mador_mavdak: formData.get('iluzei_reaionot_mador_mavdak') as string,
            group_participants: getParticipants()
          });
          break;
        case 'hakhana':
          await api.createHakhana({
            date: formData.get('date') as string,
            deadline: new Date(formData.get('deadline') as string).toISOString(),
            group_participants: getParticipants()
          });
          break;
        case 'veadat_keva':
          await api.createVeadatKeva({
            date: formData.get('date') as string,
            deadline: new Date(formData.get('deadline') as string).toISOString(),
            group_participants: getParticipants()
          });
          break;
      }
      setSuccess(`Successfully created ${selectedAction} action!`);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create action');
    } finally {
      setLoading(false);
    }
  };
  return <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(['raf0', 'mavdak', 'hakhana', 'veadat_keva'] as ActionType[]).map(type => <Button key={type} variant={selectedAction === type ? 'default' : 'outline'} onClick={() => {
        setSelectedAction(selectedAction === type ? null : type);
        setSuccess(null);
        setError(null);
      }} className="capitalize">
              {type.replace('_', ' ')}
            </Button>)}
      </div>

      {selectedAction && <Card className="animate-in fade-in slide-in-from-top-4 duration-300 border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <Plus className="h-4 w-4 text-slate-500" />
                <h3 className="font-medium text-slate-900 capitalize">
                  Create {selectedAction.replace('_', ' ')}
                </h3>
              </div>

              {selectedAction === 'raf0' && <>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input type="date" name="date" required />
                  </div>
                </>}

              {selectedAction === 'mavdak' && <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="base_date">Base Date</Label>
                      <Input type="date" name="base_date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline_mavdak_list">Deadline</Label>
                      <Input type="datetime-local" name="deadline_mavdak_list" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="forms_link">Forms Link</Label>
                    <Input type="url" name="forms_link" placeholder="https://..." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iluzei_reaionot_mador_mavdak">
                      Iluzei Reaionot
                    </Label>
                    <Input type="text" name="iluzei_reaionot_mador_mavdak" required />
                  </div>
                </>}

              {(selectedAction === 'hakhana' || selectedAction === 'veadat_keva') && <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input type="date" name="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input type="datetime-local" name="deadline" required />
                    </div>
                  </div>
                </>}

              <div className="space-y-2">
                <Label htmlFor="group_participants">
                  Participants (comma separated phone numbers)
                </Label>
                <Input name="group_participants" placeholder="+972500000000, +972500000001" required />
                <p className="text-xs text-slate-500">Format: +972...</p>
              </div>

              {success && <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-100">
                  {success}
                </div>}
              {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">
                  {error}
                </div>}

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? <span className="flex items-center gap-2">
                      Processing...
                    </span> : <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Create Action
                    </span>}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>}
    </div>;
}