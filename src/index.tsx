import ReactDOM from "react-dom";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeCell from "./component/CodeCell";
import TextEditor from "./component/TextEditor";
import { Provider } from "react-redux";
import { store } from "./state";

const App = () => {
    return (
        <div>
            {/* <CodeCell /> */}
            {/* <CodeCell /> */}
            <TextEditor />
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById("root")
);
