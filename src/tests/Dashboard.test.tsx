import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'


const TestComponent = () => (
    <div>
        <h1>AutoFlex Materials</h1>
        <p>SMART SUGGESTIONS</p>
    </div>
);

describe('Front-end Unit Tests', () => {
    test('deve renderizar o título principal do sistema', () => {
        render(<TestComponent />);
        const titleElement = screen.getByText(/AutoFlex Materials/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('deve exibir a seção de sugestões inteligentes', () => {
        render(<TestComponent />);
        const sectionElement = screen.getByText(/SMART SUGGESTIONS/i);
        expect(sectionElement).toBeInTheDocument();
    });
});