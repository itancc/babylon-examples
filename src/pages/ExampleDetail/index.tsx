import FullBox from "@/components/FullBox";
import { useExamples } from "@/hooks/useExamples";
import { useParams } from "react-router-dom";

const ExampleDetail = () => {
  const { name } = useParams();
  const examplesComponents = useExamples();
  const CurrentComponent = examplesComponents.find(
    (eComponent) => eComponent.name === name
  );

  return (
    <FullBox sx={{ p: 3 }}>
      {CurrentComponent ? <CurrentComponent.component /> : null}
    </FullBox>
  );
};

export default ExampleDetail;
