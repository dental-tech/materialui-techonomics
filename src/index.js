import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

import { Root, Header, Nav, Content, Footer, presets } from "./Layout";
import NavContentEx from "./components/NavContentEx";
import NavHeaderEx from "./components/NavHeaderEx";
import HeaderEx from "./components/HeaderEx";
import ContentForm from "./components/ContentForm";
import ContentEx from "./components/ContentEx";
import FooterEx from "./components/FooterEx";

import "./styles.css";

// add presets.create{}() to config props in Root to change the behavior, looking and layout
// <Root config={presets.createCozyLayout()}> ...
function App() {
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState("createDefaultLayout");
  const [data, setData] = useState({
    header: true,
    nav: true,
    content: true,
    footer: true
  });
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Typography variant={"h2"}>Changing Preset...</Typography>
        </div>
      ) : (
        <Root config={presets[preset]()} style={{ minHeight: "100vh" }}>
          <CssBaseline />
          <Header
            menuIcon={{
              inactive: <Icon>menu_rounded</Icon>,
              active: <Icon>chevron_left</Icon>
            }}
          >
              {({ screen, collapsed }) => data.header && <HeaderEx screen={screen} collapsed={collapsed} />}
          </Header>
          <Nav
            collapsedIcon={{
              inactive: <Icon>chevron_left</Icon>,
              active: <Icon>chevron_right</Icon>
            }}
            header={({ collapsed }) =>
              data.nav && <NavHeaderEx collapsed={collapsed} />
            }
          >
            {data.nav && <NavContentEx />}
          </Nav>
          <Content>
            <ContentForm
              preset={preset}
              onChangePreset={val => {
                setLoading(true);
                setPreset(val);
                setTimeout(() => setLoading(false), 1200);
              }}
              data={data}
              onChangeData={setData}
            />
            {data.content && <ContentEx />}
          </Content>
          <Footer>{data.footer && <FooterEx />}</Footer>
        </Root>
      )}
    </MuiThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
