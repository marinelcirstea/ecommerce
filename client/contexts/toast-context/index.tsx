import * as React from "react";

type IToast = { type: string; message: string };
type Action = { type: "add" | "remove"; payload: IToast };
type Dispatch = (action: Action) => void;
type State = {
  toasts: IToast[];
};
type ToastProviderProps = { children: React.ReactNode; autoExpireIn?: number };

const ToastStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

function toastReducer(state: State, action: Action) {
  switch (action.type) {
    case "add": {
      return { toasts: [...state.toasts, action.payload] };
    }
    case "remove": {
      const newToasts = state.toasts.filter((toast) => toast.message !== action.payload.message);
      return { toasts: newToasts };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

let expiration = 0;

function ToastProvider({ children, autoExpireIn = 0 }: ToastProviderProps) {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] });

  expiration = autoExpireIn;

  const value = { state, dispatch };

  const staticValue = React.useMemo(() => value, [value]);

  return (
    <ToastStateContext.Provider value={staticValue}>
      {children}
      <ToastComponent />
    </ToastStateContext.Provider>
  );
}

const ToastComponent: React.FC = () => {
  const { toasts, remove } = internalUseToast();

  return (
    <div className="toastProvider">
      {toasts[0] &&
        toasts.map((toast) => (
          <div className={`toastItem ${toast.type}`} key={toast.message}>
            <span className="toastItemMessage">{toast.message}</span>
            <span className="toastItemCloseButton" onClick={() => remove(toast.message)}>
              X
            </span>
          </div>
        ))}
      <style jsx>
        {`
          .toastProvider {
            position: fixed;
            left: 20px;
            bottom: 20px;
            width: fit-content;
            height: auto;
            dsplay: flex;
            flex-direction: column;
          }
          .toastItem {
            padding: 10px 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-radius: 5px;
            margin-top: 6px;
          }
          .toastItem.error {
            background-color: #f41000;
          }
          .toastItem.notification {
            background-color: #00a8ff;
          }
          .toastItem.success {
            background-color: #00ff00;
          }
          .toastItem.warning {
            background-color: #ffa500;
          }
          .toastItemMessage {
            color: white;
            font-size: 16px;
            font-weight: 500;
          }
          .toastItemCloseButton {
            color: white;
            font-size: 18px;
            font-weight: bold;
            margin-left: 20px;
            cursor: pointer;
            padding: 0 5px;
          }
        `}
      </style>
    </div>
  );
};

function internalUseToast() {
  const context = React.useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const {
    state: { toasts },
    dispatch,
  } = context;

  function remove(message: string) {
    dispatch({ type: "remove", payload: { type: "asd", message } });
  }

  function markForDeletion(message: string) {
    if (expiration) {
      setTimeout(() => {
        dispatch({ type: "remove", payload: { type: "asd", message } });
      }, expiration);
    }
  }

  return { toasts, dispatch, remove, markForDeletion };
}

function useToast() {
  const { toasts, dispatch, markForDeletion } = internalUseToast();

  function add(type: string, message: string) {
    if (toasts.findIndex((t) => t.message === message) === -1) {
      dispatch({ type: "add", payload: { type, message } });
      markForDeletion(message);
    }
  }

  const notify = (message: string) => add("notification", message);

  const warn = (message: string) => add("warning", message);

  const error = (message: string) => add("error", message);
  const success = (message: string) => add("success", message);

  return { notify, warn, error, success };
}

export { ToastProvider, useToast };
export default useToast;
