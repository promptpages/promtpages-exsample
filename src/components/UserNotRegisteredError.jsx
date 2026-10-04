import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";

export default function UserNotRegisteredError() {
  const { logout } = useAuth();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Account not registered</h1>
          <p className="text-muted-foreground">
            Your account is not registered for this application. Please contact the administrator or try a different account.
          </p>
        </div>
        <Button onClick={() => logout()} variant="outline">
          Sign out and try again
        </Button>
      </div>
    </div>
  );
}
