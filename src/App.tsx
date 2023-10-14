import { App as AntdApp, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

/* styles.css */
import "./App.css";
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";
import "antd/dist/reset.css";
import Index from "./pages/Index";

function App() {

  return (
    <ConfigProvider locale={zhCN}>
      <AntdApp>
        <Index />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
