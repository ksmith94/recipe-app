import { JSX, useEffect } from "react";
import styled from "styled-components";

interface NotificationProps {
  message: string;
  title: string;
  error: boolean;
  onClose: () => void;
}

export function Notification({message, title, error, onClose}: NotificationProps): JSX.Element {
  // useEffect(() => {
  //   const timer = setTimeout(onClose, 4000);
  //   return () => clearTimeout(timer);
  // }, [onClose])
  return (
    <NotificationCard onClick={onClose} $error={error}>
      <h3>{title}</h3>
      <div onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
      </div>
    </NotificationCard>
  )
}

const NotificationCard = styled.div<{$error: boolean}>`
  width: 25%;
  border: 2px solid black;
  background-color: ${({ theme, $error }) => $error ? 
    theme.colors.error.red300 : 
    theme.colors.primary.green100
  };
  padding: 1rem;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  color: ${({theme, $error}) => $error ? theme.colors.neutral.gray900 : theme.colors.primary.green900};
`