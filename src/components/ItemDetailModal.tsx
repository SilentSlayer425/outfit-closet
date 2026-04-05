/**
 * Item Detail Modal
 *
 * View-only modal for clothing items on mobile / saved outfits.
 * Shows full image, name, category, subcategory, and custom tags.
 *
 * Customization:
 *  - Modal width: change max-w-sm
 *  - Image height: change h-64
 *  - Tag pill colors: change bg-primary/10 text-primary
 */
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ClothingItem } from '@/types/closet';
import { CATEGORY_LABELS } from '@/types/closet';

interface ItemDetailModalProps {
  open: boolean;
  item: ClothingItem | null;
  onClose: () => void;
}

export function ItemDetailModal({ open, item, onClose }: ItemDetailModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-sm rounded-2xl bg-card p-5 shadow-float"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-foreground truncate pr-4">{item.name}</h2>
              <button onClick={onClose} className="shrink-0 rounded-full p-1 transition-colors hover:bg-muted">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Full image preview — change h-64 for taller/shorter */}
            <div className="mb-4 flex justify-center rounded-xl bg-muted/30 p-4 h-64">
              <img src={item.imageData} alt={item.name} className="h-full w-auto object-contain" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                {CATEGORY_LABELS[item.category]}
                {item.subcategory && <span className="text-muted-foreground ml-1">· {item.subcategory}</span>}
              </p>

              {item.customTags && item.customTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.customTags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
