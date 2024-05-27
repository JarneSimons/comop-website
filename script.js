document.addEventListener('DOMContentLoaded', () => {
    // Select all image wrappers
    const imageWrappers = document.querySelectorAll('.image-wrapper');

    // Preload images
    const preloadImages = [
        './assets/images/comopImg1MobileDark.svg',
        './assets/images/comopImg2MobileDark.svg',
        './assets/images/comopImg3MobileDark.svg'
    ];

    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Function to change the image and overlay text
    function changeImageAndText(event) {
        const imageWrapper = event.currentTarget;
        const img = imageWrapper.querySelector('img');
        const overlay = imageWrapper.querySelector('.overlay');

        // Check the current state
        const isChanged = imageWrapper.getAttribute('data-changed') === 'true';

        // Toggle the image and text based on the current state
        if (isChanged) {
            // Change back to the original image and text
            img.src = img.dataset.originalSrc; // Use the original image source
            overlay.innerHTML = overlay.dataset.originalText; // Use the original text
            overlay.classList.remove('new-text'); // Remove new styling
            imageWrapper.setAttribute('data-changed', 'false');
        } else {
            // Change to the new image and text
            img.src = img.dataset.darkSrc; // Use the darker image source

            // Change the text after clicking
            switch (overlay.textContent) {
                case 'Gym owner':
                    overlay.dataset.newText = '<span style="color: #79ECEC; font-weight: bold;">Gym owners</span>: Build a strong gym community and unlock unlimited motivation for your members.';
                    break;
                case 'Gym member':
                    overlay.dataset.newText = '<span style="color: #FFB952; font-weight: bold;">Gym members</span>: Get motivated and win free rewards on your fitness journey.';
                    break;
                case 'Gym brand':
                    overlay.dataset.newText = '<span style="color: #D480FF; font-weight: bold;">Gym brands</span>: Elevate your brand\'s presence in the fitness world.';
                    break;
                default:
                    break;
            }

            overlay.innerHTML = overlay.dataset.newText; // Use the new text
            overlay.classList.add('new-text'); // Apply new styling

            imageWrapper.setAttribute('data-changed', 'true');
        }
    }

    // Add click event listeners to all image wrappers
    imageWrappers.forEach(wrapper => {
        // Initialize the data attributes
        const img = wrapper.querySelector('img');
        const overlay = wrapper.querySelector('.overlay');
        img.dataset.originalSrc = img.src; // Store the original image source
        overlay.dataset.originalText = overlay.textContent; // Store the original text
        img.dataset.darkSrc = img.src.replace('.svg', 'Dark.svg'); // Store the dark image source
        overlay.dataset.newText = `Discover Comop: ${overlay.textContent}`; // Store the new text
        wrapper.setAttribute('data-changed', 'false');
        // Add click event listener
        wrapper.addEventListener('click', changeImageAndText);
    });
});
