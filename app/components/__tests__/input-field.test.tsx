import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InputField from '../input-field';

describe('InputField', () => {
  it('renders correctly with required props', () => {
    render(
      <InputField
        type="text"
        id="test-input"
        name="test"
        placeholder="Test placeholder"
        ariaLabel="Test input"
      />
    );

    const input = screen.getByLabelText('Test input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('name', 'test');
    expect(input).toHaveAttribute('placeholder', 'Test placeholder');
  });

  it('applies custom className when provided', () => {
    render(
      <InputField
        type="text"
        id="test-input"
        name="test"
        placeholder="Test placeholder"
        ariaLabel="Test input"
        className="custom-class"
      />
    );

    const input = screen.getByLabelText('Test input');
    expect(input.className).toContain('custom-class');
  });

  it('passes additional props to the input element', () => {
    render(
      <InputField
        type="text"
        id="test-input"
        name="test"
        placeholder="Test placeholder"
        ariaLabel="Test input"
        data-testid="custom-test-id"
        disabled
      />
    );

    const input = screen.getByLabelText('Test input');
    expect(input).toHaveAttribute('data-testid', 'custom-test-id');
    expect(input).toBeDisabled();
  });
});
