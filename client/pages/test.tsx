import { useToast } from "contexts/toast-context";

interface TestPageProps {}

const TestPage: React.FunctionComponent<TestPageProps> = () => {
  const toast = useToast();
  return (
    <div className="h-full">
      <button onClick={() => toast.error("Something went wrong..")}>Error</button>
      <button onClick={() => toast.warn("I wouldn't do that if I were you..")}>warn</button>
      <button onClick={() => toast.success("Something went really well")}>success</button>
      <button onClick={() => toast.notify("I would like to tell you something")}>notify</button>
    </div>
  );
};

export default TestPage;
