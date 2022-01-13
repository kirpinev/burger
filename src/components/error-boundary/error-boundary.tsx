import { Component, ErrorInfo } from "react";

import { StatusContainer } from "components/status-container/status-container";

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<{}, IErrorBoundaryState> {
  state: IErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log("Возникла ошибка!", error, info);
  }

  reloadPage = (): void => {
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
