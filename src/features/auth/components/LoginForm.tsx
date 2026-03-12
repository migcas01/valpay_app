import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, Card, CardBody, Heading, Text, Callout } from "../../../shared";
import { authClient } from "../../../auth/client";

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <div className="text-center mb-8">
            <Heading variant="h2" weight="bold">
              Sign In
            </Heading>
            <Text color="secondary" className="mt-2">
              Access your commerce dashboard
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Callout type="error" title="Sign in failed" description={error} />}

            <Input
              label="Email"
              type="email"
              placeholder="admin@commerce.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
