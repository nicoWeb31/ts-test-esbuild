import ReactDOM from "react-dom";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeCell from "./component/CodeCell";
import TextEditor from "./component/TextEditor";

const App = () => {


    return (
        <div>
            {/* <CodeCell /> */}
            {/* <CodeCell /> */}
            <TextEditor/>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
