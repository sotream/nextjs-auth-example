import { FC, ReactNode, SyntheticEvent } from 'react';

// Styles
import Styles from './styles/index.module.scss';

interface IProps {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<IProps> = ({ isOpened, onClose, children }) => {
  const preventAutoClose = (e: SyntheticEvent) => e.stopPropagation();

  if (!isOpened) return null;

  return (
    <div className={Styles.container} onClick={onClose}>
      <div className={Styles.modalWrapper} onClick={preventAutoClose}>
        {children}
      </div>
    </div>
  );
};
