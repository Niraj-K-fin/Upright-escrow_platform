import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string) => {
  return format(new Date(date), 'PPP');
};

export const formatDateShort = (date: string) => {
  return format(new Date(date), 'PP');
};

export const formatTime = (date: string) => {
  return format(new Date(date), 'p');
};

export const formatDateTime = (date: string) => {
  return format(new Date(date), 'PPp');
};

export const formatTimeAgo = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};