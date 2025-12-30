import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from '../UI/Input';

expect.extend(toHaveNoViolations);

describe('Input', () => {
  describe('Rendering', () => {
    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Username" id="username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Input size="sm" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('text-sm');

      rerender(<Input size="md" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('text-base');

      rerender(<Input size="lg" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('text-lg');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Input variant="default" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('border-gray-300');

      rerender(<Input variant="filled" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('bg-gray-100');
    });
  });

  describe('Input Types', () => {
    it('renders as email input', () => {
      render(<Input type="email" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');
    });

    it('renders as password input', () => {
      render(<Input type="password" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
    });

    it('renders as number input', () => {
      render(<Input type="number" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'number');
    });
  });

  describe('States', () => {
    it('shows error state', () => {
      render(<Input error="Invalid input" data-testid="input" />);
      
      expect(screen.getByTestId('input')).toHaveClass('border-error-500');
      expect(screen.getByText('Invalid input')).toBeInTheDocument();
      expect(screen.getByTestId('input')).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows success state', () => {
      render(<Input success data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('border-success-500');
    });

    it('shows disabled state', () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId('input');
      
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('aria-disabled', 'true');
    });

    it('shows readonly state', () => {
      render(<Input readOnly value="Read only" data-testid="input" />);
      const input = screen.getByTestId('input');
      
      expect(input).toHaveAttribute('readonly');
    });

    it('shows required state', () => {
      render(<Input required label="Required Field" id="required" />);
      expect(screen.getByLabelText(/required field/i)).toBeRequired();
    });
  });

  describe('User Interaction', () => {
    it('handles value changes', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      render(<Input onChange={handleChange} data-testid="input" />);
      const input = screen.getByTestId('input');
      
      await user.type(input, 'Hello');
      
      expect(handleChange).toHaveBeenCalledTimes(5);
      expect(input).toHaveValue('Hello');
    });

    it('handles blur event', () => {
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      fireEvent.blur(input);
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('handles focus event', () => {
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      fireEvent.focus(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('Icons', () => {
    it('renders with left icon', () => {
      const Icon = () => <span data-testid="left-icon">🔍</span>;
      render(<Input leftIcon={<Icon />} data-testid="input" />);
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      const Icon = () => <span data-testid="right-icon">✓</span>;
      render(<Input rightIcon={<Icon />} data-testid="input" />);
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('renders helper text', () => {
      render(<Input helperText="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('associates helper text with input', () => {
      render(<Input helperText="Helper" id="input-with-helper" data-testid="input" />);
      const input = screen.getByTestId('input');
      
      expect(input).toHaveAttribute('aria-describedby');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Input label="Accessible Input" id="accessible-input" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA attributes for errors', () => {
      render(<Input error="Error message" id="error-input" data-testid="input" />);
      const input = screen.getByTestId('input');
      
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('supports aria-label', () => {
      render(<Input aria-label="Search" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('aria-label', 'Search');
    });
  });

  describe('Character Count', () => {
    it('shows character count when maxLength is set', () => {
      render(<Input maxLength={100} showCharCount data-testid="input" />);
      expect(screen.getByText('0 / 100')).toBeInTheDocument();
    });

    it('updates character count on input', async () => {
      const user = userEvent.setup();
      render(<Input maxLength={100} showCharCount data-testid="input" />);
      
      await user.type(screen.getByTestId('input'), 'Hello');
      
      await waitFor(() => {
        expect(screen.getByText('5 / 100')).toBeInTheDocument();
      });
    });
  });

  describe('Full Width', () => {
    it('applies full width class', () => {
      render(<Input fullWidth data-testid="input" />);
      expect(screen.getByTestId('input').parentElement).toHaveClass('w-full');
    });
  });
});
