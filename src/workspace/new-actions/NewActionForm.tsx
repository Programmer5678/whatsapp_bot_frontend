import React, { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Card, CardContent } from './ui/Card';
import { api } from '../../shared/api/client';
import './NewActionForm.css';
type ActionType = 'raf0' | 'mavdak' | 'hakhana' | 'veadat_keva';
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
  return <div className="action-form">
      <div className="action-form__buttons">
        {(['raf0', 'mavdak', 'hakhana', 'veadat_keva'] as ActionType[]).map(type => <Button key={type} variant={selectedAction === type ? 'default' : 'outline'} onClick={() => {
        setSelectedAction(selectedAction === type ? null : type);
        setSuccess(null);
        setError(null);
      }} className="action-form__button">
              {type.replace('_', ' ')}
            </Button>)}
      </div>

      {selectedAction && <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="action-form__form">
              <div className="action-form__header">
                <Plus className="action-form__header-icon" />
                <h3 className="action-form__header-title">
                  Create {selectedAction.replace('_', ' ')}
                </h3>
              </div>

              {selectedAction === 'raf0' && <div className="action-form__field">
                  <Label htmlFor="date">Date</Label>
                  <Input type="date" name="date" required />
                </div>}

              {selectedAction === 'mavdak' && <>
                  <div className="action-form__grid">
                    <div className="action-form__field">
                      <Label htmlFor="base_date">Base Date</Label>
                      <Input type="date" name="base_date" required />
                    </div>
                    <div className="action-form__field">
                      <Label htmlFor="deadline_mavdak_list">Deadline</Label>
                      <Input type="datetime-local" name="deadline_mavdak_list" required />
                    </div>
                  </div>
                  <div className="action-form__field">
                    <Label htmlFor="forms_link">Forms Link</Label>
                    <Input type="url" name="forms_link" placeholder="https://..." required />
                  </div>
                  <div className="action-form__field">
                    <Label htmlFor="iluzei_reaionot_mador_mavdak">
                      Iluzei Reaionot
                    </Label>
                    <Input type="text" name="iluzei_reaionot_mador_mavdak" required />
                  </div>
                </>}

              {(selectedAction === 'hakhana' || selectedAction === 'veadat_keva') && <div className="action-form__grid">
                  <div className="action-form__field">
                    <Label htmlFor="date">Date</Label>
                    <Input type="date" name="date" required />
                  </div>
                  <div className="action-form__field">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input type="datetime-local" name="deadline" required />
                  </div>
                </div>}

              <div className="action-form__field">
                <Label htmlFor="group_participants">
                  Participants (comma separated phone numbers)
                </Label>
                <Input name="group_participants" placeholder="+972500000000, +972500000001" required />
                <p className="action-form__hint">Format: +972...</p>
              </div>

              {success && <div className="action-form__feedback action-form__feedback--success">
                  {success}
                </div>}
              {error && <div className="action-form__feedback action-form__feedback--error">
                  {error}
                </div>}

              <div className="action-form__actions">
                <Button type="submit" disabled={loading} className="action-form__submit">
                  {loading ? <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                      Processing...
                    </span> : <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                      <Send size={16} />
                      Create Action
                    </span>}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>}
    </div>;
}