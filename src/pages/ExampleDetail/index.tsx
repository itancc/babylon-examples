import { Box } from "@/components/FullBox";
import { Button } from "@mui/material";
import sdk, { VM } from "@stackblitz/sdk";
import { useEffect, useRef, Suspense, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/** 代码编辑器集成 */
const CodeEditor = () => {
  const codeEditorRef = useRef<HTMLDivElement>(null);

  const [VM, setVM] = useState<VM>();
  const { name } = useParams();
  console.log(name);
  const navigate = useNavigate();
  const initSDK = async () => {
    const container = codeEditorRef.current as HTMLDivElement;
    const _vm = await sdk.embedProject(
      container,
      {
        title: "JS Starter",
        description: "Blank starter project for building ES6 apps.",
        template: "javascript",
        files: {
          "index.html": `<div id="app"></div>`,
          "index.js": `import './style.css';
        const appDiv = document.getElementById('app');
        appDiv.innerHTML = '<h1>JS Starter</h1>';`,
          "style.css": `body { font-family: system-ui, sans-serif; }`,
        },
        settings: {
          compile: {
            trigger: "auto",
            clearConsole: false,
          },
        },
      },
      {
        openFile: "index.js",
        terminalHeight: 50,
        theme: "dark",
      }
    );
    setVM(_vm);
  };
  useEffect(() => {
    initSDK();
  }, [VM]);
  const back = () => {
    navigate("/");
  };
  return (
    <Box sx={{ p: 3 }}>
      <Button variant="contained" sx={{ mb: 2 }} onClick={back}>
        返回
      </Button>
      <Suspense>
        <div ref={codeEditorRef}></div>
      </Suspense>
    </Box>
  );
};

export default CodeEditor;
