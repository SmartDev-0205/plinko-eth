import axios from "axios";
import * as React from "react";
import Icon from "./FontAwesomeIcon";
import Style from "./DataLoader.scss";
const Loading = () => (React.createElement("div", { className: Style.info },
    React.createElement(Icon, { icon: "spinner", spin: true, size: "lg" })));
const Failure = () => (React.createElement("div", { className: Style.info },
    React.createElement("span", { className: "text-danger" }, "Error loading Data")));
const NotFound = () => (React.createElement("div", { className: Style.info },
    React.createElement("span", { className: "text-danger" }, "404 Not Found")));
class DataLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            error: undefined,
        };
    }
    fetchData(url) {
        axios
            .get(url)
            .then((response) => {
            const data = response.data;
            this.setState({ data });
        })
            .catch((error) => {
            this.setState({ error });
        });
    }
    componentDidMount() {
        const { url } = this.props;
        this.fetchData(url);
    }
    componentDidUpdate(prevProps) {
        const { url } = this.props;
        if (url !== prevProps.url) {
            this.fetchData(url);
        }
    }
    render() {
        const { failure, notFound, loading, success } = this.props;
        const { data, error } = this.state;
        if (data) {
            return success(data);
        }
        else if (error) {
            if (error.response && error.response.status === 404) {
                return notFound ? notFound() : null;
            }
            else {
                return failure ? failure() : null;
            }
        }
        else {
            return loading ? loading() : null;
        }
    }
}
DataLoader.defaultProps = {
    loading: () => React.createElement(Loading, null),
    notFound: () => React.createElement(NotFound, null),
    failure: () => React.createElement(Failure, null),
};
export default DataLoader;
//# sourceMappingURL=DataLoader.js.map