import React from "react";

function asyncComponent(getComponent, loadingComponent) {
  return class AsyncComponent extends React.Component {
    state = { component: null };

    componentDidMount() {
      if (!this.state.component) {
        getComponent().then(component => {
          this.setState({ component });
        });
      }
    }
    render() {
      const { component: Comp } = this.state;
      if (Comp) {
        return <Comp {...this.props} />;
      }
      return loadingComponent ? loadingComponent : <div>Loading...</div>;
    }
  };
}

export default asyncComponent;
