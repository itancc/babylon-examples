import FullBox from "@/components/FullBox";
import { useExamples } from "@/hooks/useExamples";
import { useParams } from "react-router-dom";
import { OneFrameContext } from "@/hooks/useOneFrame";

const ExampleDetail = () => {
  const { name } = useParams();
  const examplesComponents = useExamples();
  const CurrentComponent = examplesComponents.find(
    (eComponent) => eComponent.name === name
  );

  return (
    <OneFrameContext.Provider value={false}>
      <FullBox sx={{ p: 3 }}>
        {CurrentComponent ? <CurrentComponent.component /> : null}
      </FullBox>
    </OneFrameContext.Provider>
  );
};

export default ExampleDetail;
