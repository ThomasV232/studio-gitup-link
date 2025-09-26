import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStudio } from "@/context/StudioContext";

const ADMIN_EMAILS = new Set(["volberg.thomas@gmail.com"]);

type ProtectedRouteProps = {
  children: ReactNode;
  /** Require the currently authenticated user to match the admin allowlist. */
  requireAdmin?: boolean;
  /** Custom path to redirect visitors who are not authenticated. */
  redirectTo?: string;
};

export const ProtectedRoute = ({ children, requireAdmin = false, redirectTo = "/auth" }: ProtectedRouteProps) => {
  const { user } = useStudio();
  const location = useLocation();

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && !ADMIN_EMAILS.has(user.email)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
