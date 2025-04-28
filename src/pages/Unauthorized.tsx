
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-solar-blue mb-4">Access Denied</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <svg
            className="h-16 w-16 text-solar-orange mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-gray-700 mb-6">
            You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
          </p>
          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
              className="w-full bg-solar-blue hover:bg-blue-700"
            >
              {isAuthenticated ? "Go to Dashboard" : "Return to Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
