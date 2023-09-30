import { uuid } from "farmbot";
import { Actions } from "../constants";
import { store } from "../redux/store";
import { CreateToastOnceProps } from "./interfaces";
import { adCreatePopupOnceProps } from "../advertisement/interfaces";

export const createToastOnce = (props: CreateToastOnceProps) => {
  const { message, fallbackLogger } = props;
  if (Object.values(store.getState().app.toasts)
    .filter(toast => toast.message == message).length > 0) {
    (fallbackLogger || console.log)(message);
  } else {
    setTimeout(() => store.dispatch({
      type: Actions.CREATE_TOAST, payload: {
        ...props,
        id: `${props.idPrefix}-toast-${uuid()}`
      }
    }));
  }
};

export const createPopupOnce = (props: adCreatePopupOnceProps) => {
  setTimeout(() => store.dispatch({
      type: Actions.CREATE_ADPOPUP, payload: {
        ...props,
        id: `${props.idPrefix}-adpopup-${uuid()}`
      }
    }));
};
