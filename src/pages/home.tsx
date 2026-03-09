import { Button } from "@/components/ui/button";

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-4xl font-bold">Welcome to SurgeBlue</h1>
      <p className="text-muted-foreground text-lg">
        The platform for County Parties, State Parties, and Candidates.
      </p>
      <Button onClick={() => navigate("/login")}>Go to Login</Button>
    </div>
  );
}
