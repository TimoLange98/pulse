export type ToastLevel = 'success' | 'warning' | 'error';

export type Toast = {
  level: ToastLevel;
  title: string;
  message: string;
};
