import toast from 'react-hot-toast';

export const showSuccessNotification = message => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
  });
};

export const showErrorNotification = message => {
  toast.error(message, {
    duration: 3000,
    position: 'top-right',
  });
};
