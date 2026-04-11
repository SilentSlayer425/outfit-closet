/**
 * DeleteData page
 *
 * Accessible at delete.outfitcanvas.com and from the profile dropdown.
 * Two-step confirmation: type DELETE → final confirmation button.
 */
import { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { goToSubdomain } from '@/utils/navigation';

interface DeleteDataProps {
  onConfirmDelete?: () => void;
}

export default function DeleteData({ onConfirmDelete }: DeleteDataProps) {
  const [typed, setTyped]     = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [done, setDone]       = useState(false);

  const ready = typed.trim().toUpperCase() === 'DELETE';

  const handleDelete = () => {
    if (!ready) return;
    onConfirmDelete?.();
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <h1 className="text-2xl font-heading font-bold text-foreground">Data Deleted</h1>
          <p className="text-muted-foreground">
            All your closet items, outfits, and preferences have been removed.
          </p>
          <Button onClick={() => goToSubdomain('home')} className="rounded-xl">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">

        <button
          onClick={() => goToSubdomain('home')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go back
        </button>

        <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
            <h1 className="text-xl font-heading font-bold text-foreground">Delete All Data</h1>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This permanently deletes everything stored in your Google Drive for this app.{' '}
            <strong className="text-foreground">This cannot be undone.</strong>
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>All clothing items and photos</li>
            <li>All saved outfits</li>
            <li>Weather city and preferences</li>
            <li>Dark mode and other settings</li>
          </ul>
        </div>

        {!confirmed ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Type <strong className="text-foreground font-mono">DELETE</strong> to continue:
            </p>
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/40"
            />
            <Button
              variant="destructive"
              className="w-full rounded-xl gap-2"
              disabled={!ready}
              onClick={() => setConfirmed(true)}
            >
              <Trash2 className="w-4 h-4" /> Continue to Delete
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-destructive text-center">
              Last chance — are you absolutely sure?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => { setConfirmed(false); setTyped(''); }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-xl gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" /> Delete Everything
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
