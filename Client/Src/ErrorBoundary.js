import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Initial state is to not show an error screen
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error occurred
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error to an external service (optional)
    console.error("Error occurred:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI in case of error
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    // Normal rendering if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
