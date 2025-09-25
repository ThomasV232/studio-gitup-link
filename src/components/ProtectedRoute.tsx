import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStudio } from "@/context/StudioContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useStudio();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};
