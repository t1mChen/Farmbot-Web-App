export interface adPopupOptions {
    title?: string;
    color?: string;
    idPrefix?: string;
    noTimer?: boolean;
    noDismiss?: boolean;
  }
  
  interface adCreatePopupProps {
    message: string;
    title: string;
    color: string;
    pic: string;
    hyperlink: string;
    idPrefix?: string;
    noTimer?: boolean;
    noDismiss?: boolean;
  }
  
  export interface adCreatePopupOnceProps extends adCreatePopupProps {
    fallbackLogger?: (x: string) => void;
  }
  
  export interface adPopupMessageProps extends adCreatePopupProps {
    id: string;
  }
  

  
  export type adPopupMessages = Record<string, adPopupMessageProps>;
  
  export interface adPopupState {
    /** Amount of time before each element is removed. */
    timeout: number;
    /** User's mouse is hovering over the message? */
    isHovered: boolean;
    detached: boolean;
    dismissed: boolean;
    intervalId: NodeJS.Timeout | undefined;
  }
  
  export interface adPopupProps extends adPopupMessageProps {
    dispatch: Function;
  }
  
  export interface adPopupsProps {
    adpopupMessages: adPopupMessages;
    dispatch: Function;
  }
  