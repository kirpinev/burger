import React from "react";

import { StatusContainer } from "components/status-container/status-container";

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Возникла ошибка!", error, info);
  }

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <StatusContainer
          buttonText="Перезагрузить"
          onButtonClick={this.reloadPage}
          title="Что-то странное произошло со страницей, перезагрузить?"
        />
      );
    }

    return this.props.children;
  }
}
