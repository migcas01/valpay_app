import { Heading, Text, Link } from "../shared";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-4">
        <Heading variant="h1" weight="bold" className="text-6xl text-gray-300">
          404
        </Heading>
        <Heading variant="h3" weight="medium">
          Page not found
        </Heading>
        <Text color="secondary">
          The page you are looking for does not exist.
        </Text>
        <Link to="/" weight="medium">
          Go home
        </Link>
      </div>
    </div>
  );
}
