document.addEventListener('DOMContentLoaded', () => {
    const valueInput = document.getElementById('valueInput');
    const fractionResult = document.getElementById('fractionResult');
    const numberButtons = document.querySelectorAll('.number-pad .number');
    const decimalButton = document.querySelector('.number-pad .decimal');
    const clearButton = document.querySelector('.number-pad .clear');

    // Load saved value
    valueInput.value = localStorage.getItem('value') || '';
    updateResult();

    // Greatest Common Divisor for simplifying fractions
    function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // Convert decimal to fraction
    function decimalToFraction(decimal) {
        if (isNaN(decimal) || decimal === 0) return '0';
        const precision = 1e6; // For 6 decimal places
        let numerator = Math.round(decimal * precision);
        let denominator = precision;
        const divisor = gcd(numerator, denominator);
        numerator /= divisor;
        denominator /= divisor;

        // Handle whole numbers and mixed numbers
        const whole = Math.floor(numerator / denominator);
        numerator = numerator % denominator;

        if (numerator === 0) return whole.toString();
        if (whole === 0) return `${numerator}/${denominator}`;
        return `${whole} ${numerator}/${denominator}`;
    }

    function updateResult() {
        const value = parseFloat(valueInput.value);
        fractionResult.textContent = `Fraction: ${isNaN(value) ? '0' : decimalToFraction(value)}`;
        localStorage.setItem('value', valueInput.value);
    }

    // Input event
    valueInput.addEventListener('input', () => {
        updateResult();
    });

    // Number pad buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            valueInput.value += button.textContent;
            valueInput.focus();
            updateResult();
        });
    });

    // Decimal button
    decimalButton.addEventListener('click', () => {
        if (!valueInput.value.includes('.')) {
            if (valueInput.value === '') {
                valueInput.value = '0.';
            } else {
                valueInput.value += '.';
            }
            setTimeout(() => {
                valueInput.focus();
                updateResult();
            }, 0);
        }
    });

    // Clear button
    clearButton.addEventListener('click', () => {
        valueInput.value = '';
        valueInput.focus();
        updateResult();
    });

    // Ensure focus on touch
    valueInput.addEventListener('touchstart', () => {
        setTimeout(() => valueInput.focus(), 0);
    });
});