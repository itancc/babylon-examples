import ThemeCustomization from "@/themes";
import NavigationScroll from "@/components/NavigationScroll";
import Routes from "@/routes";

function App() {
  return (
    <ThemeCustomization>
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </ThemeCustomization>
  );
}

export default App;
