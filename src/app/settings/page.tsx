import { ThemeContext, useTheme } from "@/context-api/themeContextProvider";
import FontPicker from "@/components/FontPicker";
import ThemeToggler from "@/components/ThemeToggler";
import LogoUpdater from "@/components/LogoUpdater";
import PageTitle from "@/components/PageTitle";


const Home = () => {

  return (
    <div>
      <PageTitle text='Settings' />
      <LogoUpdater />
      <FontPicker />
      <ThemeToggler />
    </div>
  );
};

export default Home;
