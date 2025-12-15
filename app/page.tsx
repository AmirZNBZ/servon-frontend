import { Button } from "./components/atoms/Button";

export default function Home() {
  return (
    <div className="p-8">
      <Button>Click Me</Button>
      <Button variant="primary" size="sm">
        Click Me
      </Button>
      <Button variant="outline" size="lg">
        Click Me
      </Button>
    </div>
  );
}
