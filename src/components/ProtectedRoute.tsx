import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStudio } from "@/context/StudioContext";

const ADMIN_EMAIL = "volberg.thomas@gmail.com";

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: {
  children: ReactNode;
  requireAdmin?: boolean;
}) => {
  const { user } = useStudio();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
