import React, { PureComponent } from 'react';

export default class TestComponent extends PureComponent {
    render() {
        return (
            <div style={{ margin: 10, padding: 10, borderRadius: 2, backgroundColor: '#EEE' }}>
                This div is a React Component
            </div>
        );
    }
}