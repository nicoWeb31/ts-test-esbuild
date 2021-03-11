import ReactDOM from "react-dom";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./component/cellList/CellList";

const App = () => {
    return (
        <div>
            <CellList />
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById("root")
);
