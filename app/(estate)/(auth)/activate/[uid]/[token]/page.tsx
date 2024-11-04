"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useCallback, memo } from "react";
import { toast } from "react-toastify";
import { useActivateUserMutation } from "@/lib/redux/features/auth/authApi";

interface ActivationParams {
  uid?: string;
  token?: string;
}

const StatusMessage = memo(({
  isLoading,
  isSuccess,
  isError
}: {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}) => {
  const baseStyles = "flex items-center justify-center space-x-3 p-6 rounded-lg transition-all duration-300";

  if (isLoading) {
    return (
      <div className={`${baseStyles} bg-blue-50/10 dark:bg-slate-800/50`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 dark:border-blue-300"></div>
          <div className="text-center">
            <h4 className="text-lg font-medium text-blue-600">
              Activating Account
            </h4>
            <p className="text-sm text-blue-500 dark:text-blue-300/80">
              Please wait while we activate your account...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={`${baseStyles} bg-green-50/10 dark:bg-slate-800/50`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-green-100/20 dark:bg-green-900/20 p-3">
            <svg
              className="h-8 w-8 text-green-500 dark:text-green-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium text-green-600 dark:text-green-200">
              Activation Successful!
            </h4>
            <p className="text-sm text-green-500 dark:text-green-300/80">
              Your account has been successfully activated. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${baseStyles} bg-red-50/10 dark:bg-slate-800/50`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-red-100/20 dark:bg-red-900/20 p-3">
            <svg
              className="h-8 w-8 text-red-500 dark:text-red-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium text-red-600 dark:text-red-200">
              Activation Failed
            </h4>
            <p className="text-sm text-red-500 dark:text-red-300/80">
              This account has already been activated or the link is invalid.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
});

StatusMessage.displayName = 'StatusMessage';

const ActivationPage = () => {
  const router = useRouter();
  const params = useParams() as ActivationParams;
  const [activateUser, { isLoading, isSuccess, isError, error }] = useActivateUserMutation();

  const validateParams = useCallback((): boolean => {
    if (!params.uid || !params.token) {
      toast.error("Invalid activation link");
      router.push("/login");
      return false;
    }
    return true;
  }, [params.uid, params.token, router]);

  const handleActivation = useCallback(async () => {
    if (!validateParams()) return;

    try {
      await activateUser({
        uid: params.uid!,
        token: params.token!
      });
    } catch (err) {
      console.error('Activation error:', err);
      toast.error("An unexpected error occurred");
    }
  }, [activateUser, params.uid, params.token, validateParams]);

  useEffect(() => {
    handleActivation();
  }, [handleActivation]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account successfully activated!");
      const redirectTimer = setTimeout(() => {
        router.push("/login");
      }, 5000);

      return () => clearTimeout(redirectTimer);
    }

    if (isError && error) {
      if ('data' in error) {
        toast.error(error.data?.message || "Account activation failed");
      } else {
        toast.error("Account activation failed");
      }
    }
  }, [isSuccess, isError, error, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="mx-auto max-w-lg">
        <div className="overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 ring-1 ring-gray-900/5 dark:ring-white/10 transition-all duration-300">
          {/* Header */}
          <div className="border-b border-gray-200/80 dark:border-gray-700/80 px-4 py-6 sm:px-6 backdrop-blur-sm">
            <h2 className="text-center text-xl font-semibold text-gray-800 sm:text-2xl transition-colors duration-200">
              Account Activation
            </h2>
          </div>

          {/* Message Area */}
          <div className="p-4 sm:p-6">
            <StatusMessage
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
            />
          </div>

          {/* Footer */}
          <div className="bg-gray-50/80 dark:bg-gray-900/50 px-4 py-4 sm:px-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-800">
              Having trouble?
              <button
                onClick={() => router.push('/contact')}
                className="ml-2 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
              >
                Contact support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ActivationPage);