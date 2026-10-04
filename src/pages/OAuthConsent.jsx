import React, { useEffect, useState } from "react";
import { appParams } from "@/lib/app-params";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

// App-side OAuth consent page for the app's MCP server.
export default function OAuthConsent() {
  const ctx = new URLSearchParams(window.location.search).get("ctx");
  const [info, setInfo] = useState(null);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [decided, setDecided] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      let redirecting = false;
      try {
        if (!ctx) {
          setError("This authorization link is invalid or has expired.");
          return;
        }
        const infoHeaders = {};
        if (appParams.token) infoHeaders.Authorization = "Bearer " + appParams.token;
        const res = await fetch(
          `/api/apps/${appParams.appId}/mcp/consent-info?handle=${encodeURIComponent(ctx)}`,
          { credentials: "include", headers: infoHeaders }
        );
        if (!res.ok) {
          setError("This authorization link is invalid or has expired.");
          return;
        }
        const data = await res.json();
        if (!data.authenticated) {
          const returnTo = window.location.pathname + "?ctx=" + encodeURIComponent(ctx);
          const encoded = encodeURIComponent(returnTo);
          redirecting = true;
          window.location.href =
            (data.login_path || "/login") + "?returnTo=" + encoded + "&from_url=" + encoded;
          return;
        }
        setInfo(data);
      } catch (e) {
        setError("Could not load this authorization request. Please try again.");
      } finally {
        if (!redirecting) setChecking(false);
      }
    })();
  }, [ctx]);

  const respond = async (action) => {
    setSubmitting(true);
    setError("");
    try {
      const headers = { "Content-Type": "application/json" };
      if (appParams.token) headers.Authorization = "Bearer " + appParams.token;
      const res = await fetch(`/api/apps/${appParams.appId}/mcp/authorize-grant`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({ ctx, action }),
      });
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      const data = await res.json();
      setDecided(action);
      if (data.redirect_uri) {
        window.location.href = data.redirect_uri;
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (checking) {
    return (
      <AuthLayout icon={Loader2} title="Loading..." subtitle="Please wait">
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout icon={ShieldCheck} title="Authorization error" subtitle={error}>
        <p className="text-sm text-center text-muted-foreground">{error}</p>
      </AuthLayout>
    );
  }

  if (decided) {
    return (
      <AuthLayout
        icon={ShieldCheck}
        title={decided === "approve" ? "Authorized" : "Denied"}
        subtitle={decided === "approve" ? "You can close this window." : "Access was denied."}
      >
        <p className="text-sm text-center text-muted-foreground">
          {decided === "approve"
            ? "The application has been authorized."
            : "You denied the authorization request."}
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={ShieldCheck}
      title="Authorize access"
      subtitle={info?.client_name ? `${info.client_name} is requesting access` : "An application is requesting access"}
    >
      <div className="space-y-4">
        {info?.scopes && info.scopes.length > 0 && (
          <ul className="text-sm space-y-1 text-muted-foreground">
            {info.scopes.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        )}
        <div className="flex gap-3">
          <Button
            className="flex-1"
            onClick={() => respond("approve")}
            disabled={submitting}
          >
            {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Approve
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => respond("deny")}
            disabled={submitting}
          >
            Deny
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
