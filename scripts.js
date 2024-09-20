const sections = [
    { name: 'no', min: 0, max: 16.66, start: 567, end: 475, color: '#EE2805' },
    { name: 'low', min: 16.67, max: 33.33, start: 475, end: 384, color: '#FE8500' },
    { name: 'medium', min: 33.34, max: 50.00, start: 384, end: 294, color: '#FFD203' },
    { name: 'normal', min: 50.01, max: 66.66, start: 294, end: 204, color: '#B8DE17' },
    { name: 'high', min: 66.67, max: 83.33, start: 204, end: 114, color: '#8BE000' },
    { name: 'max', min: 83.34, max: 100, start: 114, end: 8, color: '#50B91F' }
];
// Get references to DOM elements
const appleLabelWrapper = document.querySelector('.apple-label-wrapper');
const ibmLabelWrapper = document.querySelector('.ibm-label-wrapper');
const appleInput = document.getElementById('apple-input');
const ibmInput = document.getElementById('ibm-input');

// Function to calculate position within section
function calculatePosition(section, value) {
    const range = section.max - section.min;
    const pixelRange = section.start - section.end;
    const valueRatio = (value - section.min) / range;
    return section.start - valueRatio * pixelRange;
}

// Function to adjust the pointer position and color
function adjustPointer(pointer, value) {
    let section = sections.find(sec => value >= sec.min && value <= sec.max);

    // Calculate the exact position based on value
    let position = calculatePosition(section, value);

    // Apply the position and color
    pointer.style.top = `${position}px`;
    pointer.querySelector('.label').style.backgroundColor = section.color;
}

// Event listeners for input changes
appleInput.addEventListener('input', (e) => {
    const value = parseInt(e.target.value, 10);
    adjustPointer(appleLabelWrapper, value);
});

ibmInput.addEventListener('input', (e) => {
    const value = parseInt(e.target.value, 10);
    adjustPointer(ibmLabelWrapper, value);
});

// Initial setup
adjustPointer(appleLabelWrapper, appleInput.value);
adjustPointer(ibmLabelWrapper, ibmInput.value);