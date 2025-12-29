"use client";

import React from "react";

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded border border-red-500 p-4">
            <p className="text-red-500 font-bold">Something Went Wrong</p>
            <button onClick={this.reset} className="mt-2 bg-primary rounded px-3 py-1 text-white">
              Retry
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
