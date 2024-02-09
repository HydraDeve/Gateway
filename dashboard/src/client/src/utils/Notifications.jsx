import { toast } from 'react-toastify';

import { RiErrorWarningLine, RiCheckLine } from 'react-icons/ri';

export const notify_error = (err) => {
	toast.error(
		<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
			<RiErrorWarningLine style={{ fontSize: '28px' }} />
			<p style={{ fontSize: '.875rem', fontWeight: '400' }}>{err}</p>
		</div>,
		{
			icon: false,
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			pauseOnFocusLoss: false,
			draggable: true,
			progress: undefined,
		}
	);
};
export const notify_success = (err) => {
	toast.success(
		<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
			<RiCheckLine style={{ fontSize: '28px' }} />
			<p style={{ fontSize: '.875rem', fontWeight: '400' }}>{err}</p>
		</div>,
		{
			icon: false,
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			pauseOnFocusLoss: false,
			draggable: true,
			progress: undefined,
		}
	);
};
