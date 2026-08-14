export type Integration = {
  id: string;
  label: string;
  /** Degrees clockwise from 12 o'clock */
  angle: number;
  icon: 'chat' | 'docs' | 'workspace' | 'crm' | 'storage' | 'search' | 'notes';
};

/** Seven nodes around the hub — even spacing from top */
export const INTEGRATIONS: Integration[] = [
  { id: 'chat', label: 'CHAT', angle: 0, icon: 'chat' },
  { id: 'docs', label: 'DOCS', angle: 51.4, icon: 'docs' },
  { id: 'workspace', label: 'WORKSPACE', angle: 102.9, icon: 'workspace' },
  { id: 'crm', label: 'CRM', angle: 154.3, icon: 'crm' },
  { id: 'storage', label: 'STORAGE', angle: 205.7, icon: 'storage' },
  { id: 'search', label: 'SEARCH', angle: 257.1, icon: 'search' },
  { id: 'notes', label: 'NOTES', angle: 308.6, icon: 'notes' },
];
