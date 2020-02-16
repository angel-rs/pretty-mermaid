import { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
      hasError: false,
    };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch() {
    // console.log(error);
	}

	render() {
    const { hasError, children } = this.state;

		if (hasError) {
			return null;
		}

		return children;
	}
}

export { ErrorBoundary };