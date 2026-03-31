import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error })
        console.error('App Error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full text-center py-12">
                        <div className="w-24 h-24 mx-auto bg-forest-100 rounded-2xl flex items-center justify-center mb-8">
                            <svg className="w-12 h-12 text-forest-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 font-display">Terjadi Kesalahan</h1>
                        <p className="text-gray-500 mb-8 font-sans">Halaman tidak dapat dimuat. Silakan muat ulang atau hubungi administrator.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary w-full max-w-xs mx-auto"
                        >
                            Muat Ulang Halaman
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
