import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { hasToken } from "../shared/lib/auth";
import { getMe } from "../shared/api/auth";
import { removeToken } from "../shared/lib/token";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/auth/login");

  useEffect(() => {
    async function checkAccess() {
      if (!hasToken()) {
        setIsAllowed(false);
        setRedirectTo("/auth/login");
        setLoading(false);
        return;
      }

      try {
        const me = await getMe();

        if (allowedRoles.length === 0) {
          setIsAllowed(true);
          setLoading(false);
          return;
        }

        if (allowedRoles.includes(me.role)) {
          setIsAllowed(true);
          setLoading(false);
          return;
        }

        if (me.role === "employer") {
          setRedirectTo("/dashboard/employer");
        } else if (me.role === "student") {
          setRedirectTo("/dashboard/student");
        } else {
          setRedirectTo("/auth/login");
        }

        setIsAllowed(false);
      } catch (error) {
        removeToken();
        setIsAllowed(false);
        setRedirectTo("/auth/login");
      } finally {
        setLoading(false);
      }
    }

    checkAccess();
  }, [allowedRoles]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5efe8] text-2xl text-[#3a2a22]">
        Loading...
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;