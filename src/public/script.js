function MyApp() {
  return React.createElement("h1", null, "Hello, world!!");
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(MyApp));
