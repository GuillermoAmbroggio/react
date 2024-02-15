import { Modal } from 'antd';

type Arguments = {
  time?: number;
  title: string;
  message?: string;
  permanent?: boolean;
  status: 'success' | 'error';
};

const alertModal = ({ time, title, message, permanent, status }: Arguments) => {
  let secondsToGo = time ?? 5;

  const modal = Modal[status]({
    title,
    content: message ?? '',
    okText: 'Continuar',
  });

  if (!permanent) {
    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }
};

export default alertModal;
