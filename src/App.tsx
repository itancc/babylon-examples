import ThemeCustomization from "@/themes";
import NavigationScroll from "@/components/NavigationScroll";
import Routes from "@/routes";
import RouteBeforeEach from "./routes/RouterBeforeEach";

function App() {
  return (
    <ThemeCustomization>
      <NavigationScroll>
        <RouteBeforeEach>
          <Routes />
        </RouteBeforeEach>
      </NavigationScroll>
    </ThemeCustomization>
  );
}

export default App;
