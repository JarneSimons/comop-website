document.addEventListener('DOMContentLoaded', () => {
    // Select all image wrappers
    const imageWrappers = document.querySelectorAll('.image-wrapper');

    // Preload images
    const preloadImages = [
        './assets/images/comopImg1MobileDark.svg',
        './assets/images/comopImg2MobileDark.svg',
        './assets/images/comopImg3MobileDark.svg',
        './assets/icons/crossIcon.svg' // Preload the cross icon
    ];

    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Function to change the image and overlay text
    function changeImageAndText(event) {
        event.stopPropagation(); // Prevent click event from propagating to parent elements

        const overlayIcon = event.currentTarget;
        const imageWrapper = overlayIcon.closest('.image-wrapper');
        const img = imageWrapper.querySelector('img:not(.overlay-icon img)');
        const overlay = imageWrapper.querySelector('.overlay');

        // Check the current state
        const isChanged = imageWrapper.getAttribute('data-changed') === 'true';

        // Toggle the image, text, and icon based on the current state
        if (isChanged) {
            // Change back to the original image, text, and icon
            img.src = img.dataset.originalSrc; // Use the original image source
            overlay.innerHTML = overlay.dataset.originalText; // Use the original text
            overlay.classList.remove('new-text'); // Remove new styling
            overlayIcon.querySelector('img').src = './assets/icons/infoIcon.svg'; // Change to info icon
            imageWrapper.setAttribute('data-changed', 'false');
        } else {
            // Change to the new image, text, and icon
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
            overlayIcon.querySelector('img').src = './assets/icons/crossIcon.svg'; // Change to cross icon
            imageWrapper.setAttribute('data-changed', 'true');
        }
    }

    // Function to handle image click and navigate to a new URL
    function navigateToUrl(event) {
        const imageWrapper = event.currentTarget;
        const url = imageWrapper.dataset.url;
        window.location.href = url;
    }

    // Add click event listeners to all overlay icons and images
    const overlayIcons = document.querySelectorAll('.overlay-icon');
    const images = document.querySelectorAll('.image-wrapper');

    overlayIcons.forEach(icon => {
        // Initialize the data attributes
        const imageWrapper = icon.closest('.image-wrapper');
        const img = imageWrapper.querySelector('img:not(.overlay-icon img)');
        const overlay = imageWrapper.querySelector('.overlay');
        img.dataset.originalSrc = img.src; // Store the original image source
        overlay.dataset.originalText = overlay.textContent; // Store the original text
        img.dataset.darkSrc = img.src.replace('.svg', 'Dark.svg'); // Store the dark image source
        overlay.dataset.newText = `Discover Comop: ${overlay.textContent}`; // Store the new text
        imageWrapper.setAttribute('data-changed', 'false');
        // Add click event listener to the icon
        icon.addEventListener('click', changeImageAndText);
    });

    images.forEach(wrapper => {
        // Set URLs for each image wrapper
        switch (wrapper.querySelector('.overlay').textContent) {
            case 'Gym owner':
                wrapper.dataset.url = './comopForOwners.html'; // Replace with actual URL
                break;
            case 'Gym member':
                wrapper.dataset.url = './comopForMembers.html'; // Replace with actual URL
                break;
            case 'Gym brand':
                wrapper.dataset.url = './comopForGymbrands.html'; // Replace with actual URL
                break;
            default:
                break;
        }
        // Add click event listener to the image wrapper
        wrapper.addEventListener('click', navigateToUrl);
    });
});
