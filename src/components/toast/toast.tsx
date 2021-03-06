import { BiErrorCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';

interface PropsToast {
  title?: string;
  body: string;
}

export const ToastMsg = ({ title, body }: PropsToast) => (
  <div>
    <label className="ms-4 toastTitle no-break-word">{title}</label>
    <p className="ms-4 toastBody no-break-word"> {body} </p>
  </div>
);

export const ToastSuccessIcon = () => <i className="bi bi-check-circle toastSuccessIcon"></i>;

export const ToastService = {
  error(message: string, title?: string) {
    toast.dismiss()
    toast.error(<ToastMsg title={title || 'ERROR'} body={message} />, {
      icon: <BiErrorCircle />,
    });
  },
  success(message: string) {
    toast.dismiss()
    toast.success(<ToastMsg title={'SUCCESS'} body={message} />, {
      icon: <ToastSuccessIcon />,
    });
  },
  custom(message: string, title: string, icon: React.ReactNode) {
    toast.dismiss()
    toast(<ToastMsg title={title} body={message} />, {
      icon: icon,
    });
  },
  dealWithErrorRequest(res: any) {
    if (res.response) {
      if (res.response.status === 403) {
        ToastService.error(res.response.data?.message);
        return;
      }
      if (res.response.status === 401) {
        ToastService.error(res.response.data.message);
        window.location.href = '/login';
        return;
      }
      return ToastService.error(res.response.data?.message);
    }
    if (res.request) {
      return ToastService.error('IMPOSSIBLE_TO_COMMUNICATE');
    }
  },
};
