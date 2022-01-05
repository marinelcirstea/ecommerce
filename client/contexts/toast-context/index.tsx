import * as React from "react";
import {
  AnnotationIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import XIcon from "@heroicons/react/solid/XIcon";

type IToast = { type: string; message: string };
type Action = { type: "ADD_TOAST" | "REMOVE_TOAST"; payload: IToast };
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
    case "ADD_TOAST": {
      return { toasts: [...state.toasts, action.payload] };
    }
    case "REMOVE_TOAST": {
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

function ToastComponent() {
  const { toasts, remove } = internalUseToast();

  return toasts[0] ? (
    <div
      style={{ position: "fixed", right: "30px", bottom: "30px" }}
      className="w-full max-w-xs sm:max-w-sm flex flex-col items-center mt-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.message}
          className="toastItem flex items-center w-full bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden p-4 mt-3"
        >
          <div className="flex-shrink-0">
            {toast.type === "success" && (
              <CheckCircleIcon stroke="green" className="h-6 w-6" aria-hidden="true" />
            )}{" "}
            {toast.type === "error" && (
              <XCircleIcon stroke="red" className="h-6 w-6" aria-hidden="true" />
            )}
            {toast.type === "warning" && (
              <ExclamationCircleIcon stroke="orange" className="h-6 w-6" aria-hidden="true" />
            )}
            {toast.type === "notification" && (
              <AnnotationIcon stroke="#00a8ff" className="h-6 w-6" aria-hidden="true" />
            )}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{toast.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setTimeout(() => {
                  remove(toast.message);
                }, 100);
              }}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : null;
}

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
    dispatch({ type: "REMOVE_TOAST", payload: { type: "asd", message } });
  }

  function markForDeletion(message: string) {
    if (expiration) {
      setTimeout(() => {
        remove(message);
      }, expiration);
    }
  }

  return { toasts, dispatch, remove, markForDeletion };
}

function useToast() {
  const { toasts, dispatch, markForDeletion } = internalUseToast();

  function add(type: string, message: string) {
    if (toasts.findIndex((t) => t.message === message) === -1) {
      dispatch({ type: "ADD_TOAST", payload: { type, message } });
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
