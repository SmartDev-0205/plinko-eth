import * as React from "react";
import { useLocation } from "react-router-dom";
const withTracker = (WrappedComponent) => {
    let lastPage = null;
    const trackPage = (page) => {
        if (lastPage !== page) {
            const ga = window.ga;
            if (ga) {
                ga("set", "page", page);
                ga("send", "pageview", page);
            }
            lastPage = page;
        }
    };
    const WithTracker = () => {
        const location = useLocation();
        const page = location.pathname;
        trackPage(page);
        return React.createElement(WrappedComponent, null);
    };
    WithTracker.displayName = `WithTracker(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
    return WithTracker;
};
export default withTracker;
//# sourceMappingURL=withTracker.js.map